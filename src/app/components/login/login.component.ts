import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/reducers';
import { showToast } from 'src/app/store/actions/toast.actions';
import { MessageInterface } from 'src/app/interfaces/message.interface';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AppFormService } from 'src/app/services/AppForm.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: { username?: string | null, password?: string | null; };
  triggerValidation: boolean;
  submitInProgress: boolean;
  showErrorMessage: boolean;
  submitError: MessageInterface;
  constructor(
    private store: Store<fromStore.AppState>,
    private router: Router,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private appFormService: AppFormService) { }
  ngOnInit() {
    this.errors = {
      password: null,
      username: null
    };
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  get username() {
    return this.loginForm.get('username') as FormControl;
  }
  get password() {
    return this.loginForm.get('password') as FormControl;
  }
  submitLoginForm() {
    this.submitInProgress = true;
    if (this.loginForm.valid) {
      const username: string = this.username.value;
      const password: string = this.password.value;
      this.authService.login({ username, password })
        .subscribe(success => {
          this.submitInProgress = false;
          this.store.dispatch(showToast({
            toastHeader: 'Login Successful!',
            toastBody: 'Successfully authenticated'
          }));
          this.router.navigate(['/dashboard']);
        },
          error => {
            this.submitInProgress = false;
            this.submitError = error as MessageInterface;
            this.showErrorMessage = true;
            setTimeout(() => {
              (document.querySelector('.close') as HTMLButtonElement).focus();
            }, 0);
          });
    } else {
      this.password.markAsTouched();
      this.username.markAsTouched();
      this.triggerValidation = !this.triggerValidation;
    }
  }
}
