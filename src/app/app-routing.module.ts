import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './Account/register/register.component';
import { HomeComponent } from './home/home.component';




const routes: Routes = [
  {
    path:"",
    redirectTo:"",
    pathMatch:"full"
  },
  {
    path:"Home",
    component:HomeComponent,
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
    path:"**",
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
