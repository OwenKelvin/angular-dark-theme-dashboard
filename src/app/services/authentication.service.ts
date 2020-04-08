import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { OauthInterface } from './../interfaces/oauth.interface';
import { UserInterface } from './../interfaces/user.interface';
import { map, catchError } from 'rxjs/operators';
import { IUserProfile } from '../interfaces/user-profile.interface';
import {
  PASSPORT_CLIENT_GRANT_TYPE, PASSPORT_CLIENT_CLIENT_ID, PASSPORT_CLIENT_CLIENT_SECRET
} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserInterface | null>;
  public currentUser: Observable<UserInterface | null>;
  constructor(private http: HttpClient) {
    const storedUser: any = JSON.parse(String(localStorage.getItem('currentUser')));

    this.currentUserSubject = new BehaviorSubject<UserInterface>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  get authorizationToken(): string | undefined {
    const currentUser = JSON.parse(String(localStorage.getItem('currentUser')));
    if (currentUser) {
      return `Bearer ${currentUser.access_token}`;
    }
    return;
  }
  public get currentUserValue(): UserInterface | null {
    return this.currentUserSubject.value;
  }
  public get currentUserProfile$(): Observable<IUserProfile> {
    return this.http.get('api/users/auth')
      .pipe(map((res: any) => {
        return {
          ...res,
          id: res.id,
          firstName: res.first_name,
          lastName: res.last_name,
          middleName: res.middle_name,
          otherNames: res.other_names,
          phone: res.phone,
          email: res.email,
          dateOfBirth: res.date_of_birth,
          religionName: res.religion_name,
          genderName: res.gender_name
        };
      }));
  }
  contactAdmin(_data: { email: string; }) {
    // TODO-me Authentication Service Contact admin
    return of({
      message: 'Successfully Contacted Admin'
    });
  }
  resetPassword(_data: { email: string; }) {
    // TODO-me Authentication Service reset Password
    return of({
      message: 'Password Reset Successful'
    });
  }
  login(data: { username: string, password: string; rememberMe: boolean}): Observable<any> {
    const { username, password } = data;
    const loginData: OauthInterface = {
      grant_type: PASSPORT_CLIENT_GRANT_TYPE,
      client_id: PASSPORT_CLIENT_CLIENT_ID,
      client_secret: PASSPORT_CLIENT_CLIENT_SECRET,
      username,
      password,
      scope: '',
    };
    const url = `api/oauth/token`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(url, loginData, httpOptions)
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
  logout(): Observable<any> {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return this.revokeToken();
  }
  revokeToken(): Observable<any> {
    // TODO-me Authentication Service send request to invalidate token
    return of(true);
  }
}
