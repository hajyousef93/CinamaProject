import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './Account/register/register.component';
import { HomeComponent } from './home/home.component';
import { RegisterconfirmComponent } from './Account/registerconfirm/registerconfirm.component';
import { ForgetPasswordComponent } from './Account/forget-password/forget-password.component';
import { PasswordConfirmComponent } from './Account/password-confirm/password-confirm.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AddUserComponent } from './Admin/add-user/add-user.component';




const routes: Routes = [
  {
    path:"",
    redirectTo:"",
    pathMatch:"full"
  },
  {
    path:"ControlPanal",
    component:DashboardComponent,
    pathMatch:"full"
  },
  {
    path:"AddUser",
    component:AddUserComponent,
    pathMatch:"full"
  },
  {
    path:"EditUser/:id",
    component:AddUserComponent,
    pathMatch:"full"
  },
  {
    path:"Home",
    component:HomeComponent,
    pathMatch:"full"
  },
  {
    path:"PasswordConfirm",
    component:PasswordConfirmComponent,
    pathMatch:"full"
  },
  {
    path:"ForgetPassword",
    component:ForgetPasswordComponent,
    pathMatch:"full"
  },
  {
    path:"Login",
    component:LoginComponent,
    pathMatch:"full"
  },
  {
    path:"Register",
    component:RegisterComponent,
    pathMatch:"full"
  },
  {
    path:"RegisterConfirm",
    component:RegisterconfirmComponent,
    pathMatch:"full"
  },
  {
    path:"**",
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
