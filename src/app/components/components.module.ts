import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ToastComponent } from './toast/toast.component';
import { FullWidthCenteredContentComponent } from './full-width-centered-content/full-width-centered-content.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    PasswordResetComponent,
    FooterComponent,
    HeaderComponent,
    ToastComponent,
    FullWidthCenteredContentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    PasswordResetComponent,
    FooterComponent,
    HeaderComponent,
    ToastComponent
  ]
})
export class ComponentsModule { }
