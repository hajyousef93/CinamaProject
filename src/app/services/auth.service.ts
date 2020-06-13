import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CryptService } from './crypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private service:CryptService) { }
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
  checkStorage() {
 
      const email=this.service.Decryption(localStorage.getItem('email'));
      const expire=this.service.Decryption(localStorage.getItem('expire'));
      const role=this.service.Decryption(localStorage.getItem('role'));
      if(email!=null &&role!=null&&expire!=null){
        this.ValidetUser(email,role).subscribe(success=>{
        if(!this.IsExpiredDate(expire)){
            console.log('UserAuthoriz');
            return true;
        }
      },error=>{
        console.log(error);
      });
    }
  return false;
  }
  IsExpiredDate(day:string){
    const dateNow=new Date();
    const dateExpire=new Date(Date.parse(day)); 
    if(dateExpire<dateNow){
     
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
