import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './Account/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './Account/register/register.component';
import { HomeComponent } from './home/home.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterconfirmComponent } from './Account/registerconfirm/registerconfirm.component';
import { ForgetPasswordComponent } from './Account/forget-password/forget-password.component';
import { PasswordConfirmComponent } from './Account/password-confirm/password-confirm.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UsersComponent } from './Admin/users/users.component';
import { AddUserComponent } from './Admin/add-user/add-user.component';
import { NgCircleProgressModule } from 'ng-circle-progress';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
    HomeComponent,
    FooterMenuComponent,
    RegisterconfirmComponent,
    ForgetPasswordComponent,
    PasswordConfirmComponent,
    DashboardComponent,
    UsersComponent,
    AddUserComponent
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
