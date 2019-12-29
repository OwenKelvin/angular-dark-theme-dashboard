import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Store, StoreModule } from '@ngrx/store';
import { REDUCER_TOKEN, metaReducers, AppState, reducerProvider } from 'src/app/store/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { FullWidthCenteredContentComponent } from '../full-width-centered-content/full-width-centered-content.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', async () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(REDUCER_TOKEN, {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        }
      }),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [LoginComponent, InputComponent, FullWidthCenteredContentComponent],
      providers: [reducerProvider]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store<AppState>>(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have as functions submitLogin', () => {
    component.submitLoginForm();
    expect(component).toBeTruthy();
  });

  describe('Function submitLoginForm', () => {
    let spyAuthServiceLogin;
    let spyAuthServiceRouter;
    let spyComponent;
    beforeEach(inject([AuthenticationService], (authService: AuthenticationService) => {
      component.loginForm.get('username').setValue('admin@admin.com');
      component.loginForm.get('password').setValue('password');
      spyComponent = Object.create(component);
      spyComponent.authService = { login: () => of(true) };

    }));

    it('should call login and return if no error', () => {
      spyAuthServiceLogin = spyOn(spyComponent.authService, 'login').and.callFake(() => of(true));
      spyAuthServiceRouter = spyOn(spyComponent.router, 'navigate').and.returnValue(true);
      spyComponent.submitLoginForm();
      expect(spyAuthServiceLogin).toHaveBeenCalled();
    });

    it('should call login and return if error', () => {
      spyAuthServiceLogin = spyOn(spyComponent.authService, 'login').and.callFake(() => (throwError(new Error('Fake'))));
      spyComponent.submitLoginForm();
      expect(spyAuthServiceLogin).toHaveBeenCalled();
    });

  });

  it('should have as function submitLoginForm', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('submit', null);
    fixture.detectChanges();
    component.submitLoginForm();
    expect(component).toBeTruthy();
    component.loginForm.get('username').setValue('admin@admin.com');
    component.loginForm.get('password').setValue('password');
    fixture.detectChanges();
    component.submitLoginForm();
  });
});
