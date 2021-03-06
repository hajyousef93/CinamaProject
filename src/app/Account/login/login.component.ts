import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoginModel } from 'src/app/Models/lodin-model';

import { Router } from '@angular/router';

import { RegisterServiceService } from 'src/app/services/register-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder ,private service:RegisterServiceService,private route:Router,private auth:AuthService) { }
  userGroup:FormGroup;
  logmodel:LoginModel;
  message:string;
  showSpinner=false;

  messageValidet={
    email:{
      required:"The Email is required",
      emailvalid:"Email must be  a valid email address"

    },
    passwprd:{
      required:"The Password is required",
    }
  }



  ngOnInit(): void {
    this.message='';

    this.userGroup=this.fb.group({
      Email:['',[Validators.required, Validators.email]],
      Password:['',[Validators.required,Validators.minLength(6)]],
      RememberMe:[false]

    })

    // inti LoginModel
    this.logmodel={
      Email:'',
      Password:'',
      RememberMe: false
    };
  }




  Login(){
    if(this.userGroup.valid)
    {
      this.showSpinner=true;
      this.validateLoginModel();
      this.service.Login(this.logmodel).subscribe(success=>{
       const email =this.userGroup.value.Email;
       const reMy=this.userGroup.value.RememberMe;
       this.auth.installStorage(reMy,email);
       this.showSpinner=false;
       this.route.navigate(['Home']);
      },
      err=>{
        this.message="Email or Password is wrong !!! try again";
        this.showSpinner=false;
        console.log(err.error)
        
      })
    } 

  }
  validateLoginModel() {
    this.logmodel.Email=this.userGroup.value.Email;
    this.logmodel.Password=this.userGroup.value.Password;
    this.logmodel.RememberMe=this.userGroup.value.RememberMe;

  }

}
