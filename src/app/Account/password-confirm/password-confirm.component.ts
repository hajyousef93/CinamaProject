import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetPassword } from 'src/app/Models/resetPassword';
import { CryptService } from 'src/app/services/crypt.service';



@Component({
  selector: 'app-password-confirm',
  templateUrl: './password-confirm.component.html',
  styleUrls: ['./password-confirm.component.css']
})
export class PasswordConfirmComponent implements OnInit {
  userGroup:FormGroup;
  message:string;
  messageValidate={
    pass:{
      required:"The Password is required",
      minlength:"Password must be at leastet 6 characters"
    },
    Confirmpass:{
      required:"The Password is required",
      matched:"Password and Confirm Password must be match."
    }
  }
  passModel:ResetPassword;

  constructor(
    private fb:FormBuilder,
    private service:RegisterServiceService,
    private router:Router,
    private activeRoute:ActivatedRoute,
    private encService:CryptService
    ) { }

  ngOnInit(): void {
    this.message='';
    this.passModel={
      Id:'',
      Token:'',
      Password:''
    };
  
      this.activeRoute.queryParams.subscribe(param=>{
        var exist =false;
        this.passModel.Id=param['ID'];
        this.passModel.Token=param['token'];
        if(this.passModel.Id&&this.passModel.Token){

        var tokenStorage=localStorage.getItem('token');
        var keys=Object.keys(localStorage);
        keys.forEach(element => {
          if(element!== null &&element.includes('token')){
            var item =localStorage.getItem(element);
            if(item !== null){
              var token=this.encService.Decryption(item);
              if(token===this.passModel.Token){
                exist=true;
                return;
              }
            }
          }
          
        });

          if(!exist)
          {
            this.router.navigate(['Home']).then(x=>window.location.reload());
          }
        }else{
          this.router.navigate(['Home']).then(x=>window.location.reload());
        }
      },ex=>{
        console.log(ex);
      });
      // ReactiveFormsModule
     this.userGroup=this.fb.group(
      {
        Password:['',[Validators.required,Validators.minLength(6)]],
        ConfirmPassword:['',[Validators.required]],
      });

  }

  ResetPassword(){
    if(this.userGroup.value.Password!==null){
      this.passModel.Password=this.userGroup.value.Password;
      console.log(this.passModel.Id);
      console.log(this.passModel.Token);
      console.log(this.passModel.Password);
      this.service.ApiRestPassword(this.passModel).subscribe(success=>{
        console.log("success");
        this.router.navigate(['Login']);
        localStorage.removeItem("token");
      },ex=>console.log(ex));
    }
  }


  isPasswordMatch()
  {
    if(this.userGroup.value.ConfirmPassword!==''&& this.userGroup.value.Password!==''){
      if(this.userGroup.value.Password!==this.userGroup.value.ConfirmPassword){
        return true;
      }
  }else 
        return false;    
      }
}
