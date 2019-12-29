import { Injectable } from '@angular/core';
import { ILink } from './../interfaces/link.interface';
import { Observable, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() { }
  getLinks({ type, id }): Observable<ILink[]> {
    switch (type) {
      default:
        return this.getDashboardLinks();
    }
  }

  getDashboardLinks(): Observable<ILink[]> {
    return of([
      {
        name: 'Dashboard',
        icon: 'icon-user',
        link: 'dashboard'
      }
    ]);
  }

  getAllLinks(): Observable<ILink[]> {

    return this.getDashboardLinks();
    // return zip(
    //   this.getDashboardLinks(),

    // )
    //   .pipe(map(x => x[0].concat(x[1])));
  }
}
