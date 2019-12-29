import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/reducers';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { showToast } from 'src/app/store/actions/toast.actions';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.css']
})
export class UserButtonComponent implements OnInit {

  constructor(
    private store: Store<fromStore.AppState>,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }
  logout() {
    const confirmedLogout = window.confirm('Are you sure you wish to logout?');
    if (confirmedLogout) {
      this.authService.logout().subscribe(success => {
        if (success) {
          this.store.dispatch(showToast({
            showMessage: true,
            toastBody: 'Successfully logged out',
            toastHeader: 'Logged out'
          }));
        }
        this.router.navigate(['/']);
      });
    }
  }

}
