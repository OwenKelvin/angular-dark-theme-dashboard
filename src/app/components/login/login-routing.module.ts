import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestGuard } from 'src/app/guards/guest.guard';
import { LoginComponent } from './login.component';
import { PasswordResetComponent } from '../password-reset/password-reset.component';


const routes: Routes = [
  {
    path: 'login',
    canActivate: [GuestGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
      },
      {
        path: 'reset',
        component: PasswordResetComponent,
        canActivate: [GuestGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
