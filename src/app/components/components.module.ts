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
import { LayoutComponent } from './layout/layout.component';
import { LoginModule } from './login/login.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuSearchComponent } from './menu-search/menu-search.component';
import { UserButtonComponent } from './user-button/user-button.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    PasswordResetComponent,
    FooterComponent,
    HeaderComponent,
    ToastComponent,
    FullWidthCenteredContentComponent,
    LayoutComponent,
    InputComponent,
    SidebarComponent,
    MenuSearchComponent,
    UserButtonComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsRoutingModule,
    LoginModule
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
