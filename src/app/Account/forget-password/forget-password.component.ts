import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { CryptService } from 'src/app/services/crypt.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
message:string;
userGroup:FormGroup;
messageValidet={
  email:{
    required:"The Email is required",
    emailvalid:"Email must be  a valid email address"
  }
  };
  constructor(
    private fb:FormBuilder,
    private service:RegisterServiceService,
    private encService:CryptService) { }

  ngOnInit(): void {
    this.message='';
    this.userGroup=this.fb.group({
      Email:['',[Validators.required, Validators.email]]
    })
  }

  RequestPassword(){
  var email=this.userGroup.value.Email;
  if(email!==null || email!==''){
    this.service.ForgetPassword(email).subscribe(x=>{
      var i=0;
      var exist=false;
    var token=Object.values(x).toString();
    while(localStorage.getItem('token'+i)!==null){
      i++;
      if(localStorage.getItem('token'+i)===null){
        localStorage.setItem("token"+i,this.encService.Encryption(token));
        exist=true
        break;
      }
    }
    if(!exist){
      localStorage.setItem('token'+i,this.encService.Encryption(token));
    }
    
    this.message="If the entered e-mail is correct, an activation message has been sent to it";
    },ex=>console.log(ex))
  }
  }
}
