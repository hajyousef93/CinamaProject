import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from "@angular/forms";
import { RegisterModel } from 'src/app/Models/register-model';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

constructor(private fb:FormBuilder,private service:RegisterServiceService) {

 }
userGroup:FormGroup;
reg:RegisterModel;
user:User[];
message:string;


  ngOnInit(): void {
    this.message='';
    this.user=[];

    // inti reg modle
    this.reg={
      UserName:'',
      Email:'',
      Password:'',
      ConfirmPassword:'',
      Country:'',
      Phone:null
    };

    // ReactiveFormsModule
    this.userGroup=this.fb.group(
      {
        UserName:['',Validators.required],
        Email:['',[Validators.required, Validators.email]],
        Password:['',[Validators.required,Validators.minLength(6)]],
        ConfirmPassword:['',[Validators.required]],
        Country:['',[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
        Phone:['',[Validators.required, Validators.pattern("[+]+[0-9]{12}")]]
      });

      this.AllUser();
  }


  register(){
    if(this.userGroup.valid)
    {
      this.validateRegisterModel();
      this.service.Register(this.reg).subscribe(success=>{
        this.message="Success Register Welcome "

        this.userGroup.reset();
      },erorr=>{
        console.log(erorr.erorr)
      })
    } 
  }

  AllUser(){
    this.service.GetAllUser().subscribe(list=>{
      this.user=list;
     // console.log(this.user);
    },error=>alert(error.erorr)
    );
  }

  validateRegisterModel() {
   this.reg.UserName=this.userGroup.value.UserName;
   this.reg.Email=this.userGroup.value.Email;
   this.reg.Password=this.userGroup.value.Password;
   this.reg.ConfirmPassword=this.userGroup.value.ConfirmPassword;
   this.reg.Country=this.userGroup.value.Country;
   this.reg.Phone=this.userGroup.value.Phone;

   
   
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

isUserNameExist(userName:string){
    for(const name of this.user)
    if(name.userName==userName){
      return true;
    } 
    return false;
  }
isEmailExist(em:string){
  for(const email of this.user)
  if(email.email==em){
    return true;
  } 
  return false;
}
 
    

}
