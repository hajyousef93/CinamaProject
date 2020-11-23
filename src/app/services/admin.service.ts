import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import { UserModel } from '../Models/UserModel';
import { EditUserModel } from '../Models/editUserModel';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }


  Url="http://localhost:63894/Admin/";

  headers={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    }),
    withCredentials:true
    
    
  };

  GetAllUser():Observable<User[]>{
    return this.http.get<User[]>(this.Url+"GetAllUser",this.headers).pipe();
  }
  AddUser(model:UserModel):Observable<UserModel>{
    return this.http.post<UserModel>(this.Url+"AddUser",model,this.headers).pipe();
  }
  GetUser(id:string):Observable<User>{
    return this.http.get<User>(this.Url+'GetUser/'+id,this.headers).pipe();

  }
  EditUser(model:EditUserModel):Observable<EditUserModel>{
    return this.http.put<EditUserModel>(this.Url+"EditUser",model,this.headers).pipe();

  }
  DeleteItem(ids:string[]){
    return this.http.post(this.Url+"DeleteUser",ids,this.headers).pipe();
  }
}
