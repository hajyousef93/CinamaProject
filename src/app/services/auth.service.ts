import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CryptService } from './crypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email:string;
  expire:string;
  role:string;

  constructor(private http:HttpClient,private service:CryptService) {
    if(this.isUserRegistered()){
    this.email=this.service.Decryption(localStorage.getItem('email'));
    this.expire=this.service.Decryption(localStorage.getItem('expire'));
    this.role=this.service.Decryption(localStorage.getItem('role'));
    }
   }
  /**
   * installStorage
   */
   installStorage(reMe:boolean,email:string) {
    
    const day=new Date();
    if(reMe){
      day.setDate(day.getDate()+10);
    }
    else{
      day.setMinutes(day.getMinutes()+1);
    }
    localStorage.setItem("email",this.service.Encryption(email));
    localStorage.setItem("expire",this.service.Encryption(day.toString()));
    this.GetRoleName(email).subscribe(success=>{
      localStorage.setItem("role",this.service.Encryption(success));
    },
    e=>console.log(e));
    
  }
  IsExpiredDate(day:string){
    
    const dateNow=new Date();
    const dateExpire=new Date(Date.parse(day)); 
    if(dateExpire<dateNow){
     
      return true;
    }
    return false;
  }
  isUserRegistered()
  {
    const email=!!localStorage.getItem('email');
    const role=!!localStorage.getItem('role');
    const expire=!!localStorage.getItem('expire');
    if(email&&role&&expire){
    return true;
    }
    return false;
  }


   GetRoleName(email:string){
    return this.http.get("http://localhost:63894/Account/GetRoleName/"+email,{responseType:'text'}).pipe();
  }
   ValidetUser(email:string,role:string){
    return this.http.get("http://localhost:63894/Account/CheckUserClaims/"+email+'&'+role,
    {withCredentials:true}).pipe();
  }

}
