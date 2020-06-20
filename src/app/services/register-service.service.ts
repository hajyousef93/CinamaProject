import { Injectable } from '@angular/core';
import { RegisterModel } from '../Models/register-model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../Models/user';
import { LoginModel } from '../Models/lodin-model';
import { ResetPassword } from '../Models/resetPassword';



@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http:HttpClient) { 
  
  }

  Url="http://localhost:63894/Account/";

  headers={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    }),
    withCredentials:true
    
    
  };
  
  Register(reg:RegisterModel):Observable<RegisterModel>{
    return this.http.post<RegisterModel>(this.Url+"Register",reg,this.headers).pipe();
  }


  GetAllUser():Observable<User[]>{
    return this.http.get<User[]>(this.Url+"GetAllUser").pipe();
  }

  Login(logModel:LoginModel):Observable<LoginModel>{
    return this.http.post<LoginModel>(this.Url+"Login",logModel,this.headers).pipe();
  }
  LogoutUser(){
    return this.http.get(this.Url+"Logout",{withCredentials:true}).pipe();
  }

  EmailConfirm(id:string,token:string){
    return this.http.get(this.Url+"ConfirmEmail?ID="+id+"&token="+token).pipe();
  }
  UserNameExist(username:string){
    return this.http.get(this.Url+"UserNameExist?userName="+username).pipe();
  }
  EmailExist(email:string){
    return this.http.get(this.Url+"EmailExist?email="+email).pipe();
  }
  ForgetPassword(email:string){
    return this.http.get(this.Url+"ForgetPassword?email="+email).pipe();
  }
  ApiRestPassword(passmodel:ResetPassword):Observable<ResetPassword>{
    return this.http.post<ResetPassword>(this.Url+"ResetPassword",passmodel,this.headers).pipe();
  }

  
  
}
