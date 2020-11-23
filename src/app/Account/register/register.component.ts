import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from "@angular/forms";
import { RegisterModel } from 'src/app/Models/register-model';
import { RegisterServiceService } from 'src/app/services/register-service.service';


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
message:string;
isBusy:boolean;

showSpinner=false;

messageValidate={
  userName:{
    required:'The Name is Required',
    UserNameExist:''
  },
  Email:{
    required:"The Email is required",
    email:"Email must be  a valid email address",
    EmailExists:""
  },
  pass:{
    required:"The Password is required",
    minlength:"Password must be at leastet 6 characters"
  },
  Confirmpass:{
    required:"The Password is required",
    matched:"Password and Confirm Password must be match."
  },
  country:{
    required:"The Country is required",
    pattern:"Your Country name is error"
   
  },
  phone:{
    required:"The Phone is required",
    pattern:"Your phone number has error Add Country Code ex:+961."
   
  }
}


  ngOnInit(): void {
    this.message='';
    this.isBusy=false;

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

    this.userGroup.valueChanges.subscribe(success=>{
      if(this.userGroup.status=='VALID'){
        console.log("form is Valid");
        this.isBusy=true;
      }
        
    },ex=>console.log(ex));
  }


  register(){
    if(this.userGroup.valid)
    {
      this.showSpinner=true;
      this.validateRegisterModel();
      this.service.Register(this.reg).subscribe(success=>{
        this.message="Success Register Welcome but you need to Confirm Email ";
         this.userGroup.reset();
         this.showSpinner=false;
      },erorr=>{
        this.showSpinner=false;
        console.log(erorr.erorr)
      })
    } 
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

isUserNameExist(){
  const userName=this.userGroup.value.UserName
    if(userName!=null && userName!= ''&& this.isBusy===false){
      this.service.UserNameExist(userName).subscribe(success=>{
        this.messageValidate.userName.UserNameExist="The Name is Exist!!!";
      },ex=>console.log(ex));
      return true;
    }
    else{
      this.messageValidate.userName.UserNameExist=null;
    }
    return false;
  }
isEmailExist(){
  const em=this.userGroup.value.Email;
  if(em!=null && em !=''&& this.isBusy===false){
    this.service.EmailExist(em).subscribe(success=>{
      this.messageValidate.Email.EmailExists="The Email  is Exist !!!";
    },ex=>console.log(ex));
    return true;
  }else{
    this.messageValidate.Email.EmailExists=null;
  }
  return false;
}
 
    

}
