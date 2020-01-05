import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { OauthInterface } from './../interfaces/oauth.interface';
import { UserInterface } from './../interfaces/user.interface';
import { map, catchError } from 'rxjs/operators';
import { PASSPORT_CLIENT } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserInterface>;
  public currentUser: Observable<UserInterface>;
  constructor( private http: HttpClient ) {
    const storedUser = localStorage.getItem('currentUser');

    this.currentUserSubject = new BehaviorSubject<UserInterface>(this.currentUserObject);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  get currentUserObject() {
    const userObject = JSON.parse(sessionStorage.getItem('currentUser'));
    if (userObject) {
      return userObject;
    } else {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
  }
  get authorizationToken(): string | undefined {
    const currentUser = this.currentUserObject;
    if (currentUser) {
      return `Bearer ${currentUser.access_token}`;
    }

  }
  public get currentUserValue(): UserInterface {
    return this.currentUserSubject.value;
  }
  resetPassword(data: { email: string }) {
    // TODO-me Authentication Service reset Password
    return of({
      message: 'Password Reset Successful'
    });
  }
  login(data: { username: string, password: string, rememberMe: boolean }): Observable<any> {
    const { username, password, rememberMe } = data;
    const loginData: OauthInterface = {
      grant_type: PASSPORT_CLIENT.grantType,
      client_id: PASSPORT_CLIENT.clientId,
      client_secret: PASSPORT_CLIENT.clientSecret,
      username,
      password,
      remember_me: rememberMe,
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
          if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          } else {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
          }

          this.currentUserSubject.next(user);
          return user;
        }),
        catchError( error => {
          return throwError(error);
      })
    );
  }
  logout(): Observable<any> {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return this.revokeToken();
  }
  revokeToken(): Observable<any> {
    // TODO-me Authentication Service send request to invalidate token
    return of(true);
  }
}
