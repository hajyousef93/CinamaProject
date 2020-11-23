import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AdminService } from "src/app/services/admin.service";
import { UserModel } from "src/app/Models/UserModel";
import { User } from "src/app/Models/user";
import { ActivatedRoute } from "@angular/router";
import { EditUserModel } from "src/app/Models/editUserModel";


@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  userGroup: FormGroup;
  userModel: UserModel;
  message: string;
  title: string;
  btnTitle: string;
  errorMsg: string;
  users: User[];
  userData:User;
  userDataEdit: EditUserModel;
  isEditModel: boolean;
  id: string;
  messageValidate = {
    userName: {
      required: "The Name is Required",
      UserNameExist: "the user name is exist",
    },
    Email: {
      required: "The Email is required",
      email: "Email must be  a valid email address",
      EmailExists: "the email is exist",
    },
    pass: {
      required: "The Password is required",
      minlength: "Password must be at leastet 6 characters",
    },
    Confirmpass: {
      required: "The Password is required",
      matched: "Password and Confirm Password must be match.",
    },
    country: {
      required: "The Country is required",
      pattern: "Your Country name is error",
    },
    phone: {
      required: "The Phone is required",
    },
  };

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.title = "Add New User";
    this.btnTitle = "Add User";
    this.message = "";
    this.errorMsg = "";
    this.isEditModel = false;
    this.id = "";
    this.userData=null;

    this.users = null;
    this.userDataEdit = {
      id: "",
      userName: "",
      email: "",
      emailConfirmed: false,
      password: "",
      phoneNumber: "",
      country: "",
    };

    this.userModel = {
      userName: "",
      email: "",
      emailConfirmed: false,
      passwordHash: "",
      phoneNumber: null,
      country: "",
    };

    // ReactiveFormsModule
    this.userGroup = this.fb.group({
      UserName: ["", Validators.required],
      Email: ["", [Validators.required, Validators.email]],
      EmailConfirmed: "",
      Password: ["", [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ["", [Validators.required]],
      Country: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      Phone: ["", [Validators.required]],
    });
    this.userGroup.valueChanges.subscribe(
      (success) => {
        if (this.userGroup.status == "VALID") {
          console.log("form is Valid");
        }
      },
      (ex) => console.log(ex)
    );
    this.GetAllUsers();

    this.activateRoute.paramMap.subscribe((param) => {
      var id = param.get("id");
      if (id) {
        this.service.GetUser(id).subscribe(
          (x) => {
            this.userData = x;
            this.title = "Edit User";
            this.btnTitle = "Save";
            this.isEditModel = true;
            this.AddUserDataForEdit();
            this.id = id;
            
          },
          (ex) => console.log(ex)
        );
      }
    });
  }
  AddUserDataForEdit() {
    if (this.userData !== null) {
      this.userGroup.setValue({
        UserName: this.userData.userName,
        Email: this.userData.email,
        EmailConfirmed: this.userData.emailConfirmed,
        Password: this.userData.passwordHash,
        ConfirmPassword: this.userData.passwordHash,
        Country: this.userData.country,
        Phone: this.userData.phoneNumber,
      });
    }
  }
  AddUser() {
    if (this.userGroup.valid) {
      if (!this.isEditModel) {
        this.validateUserModel();
        this.service.AddUser(this.userModel).subscribe(
          (success) => {
            this.ngOnInit();
            this.message = "Add User is Done ";
          },
          (ex) => {
            this.errorMsg = ex;
          }
        );
      } else {
       
        this.validateEditUserModel();
        this.service.EditUser(this.userDataEdit).subscribe(
          (x) => {
            this.message = "Edit User is Done";
          },
          (ex) => console.log(ex) 
        ); 
      }
    }
  }
  validateUserModel() {
    this.userModel.userName = this.userGroup.value.UserName;
    this.userModel.email = this.userGroup.value.Email;
    this.userModel.passwordHash = this.userGroup.value.Password;
    this.userModel.emailConfirmed = this.userGroup.value.EmailConfirmed;
    this.userModel.country = this.userGroup.value.Country;
    this.userModel.phoneNumber = this.userGroup.value.Phone;
  }
  validateEditUserModel() {
    this.userDataEdit.id = this.id;
    this.userDataEdit.userName = this.userGroup.value.UserName;
    this.userDataEdit.email = this.userGroup.value.Email;
    this.userDataEdit.password = this.userGroup.value.Password;
    this.userDataEdit.emailConfirmed = this.userGroup.value.EmailConfirmed;
    this.userDataEdit.country = this.userGroup.value.Country;
    this.userDataEdit.phoneNumber = this.userGroup.value.Phone;
    
  }
  isPasswordMatch() {
    if (
      this.userGroup.value.ConfirmPassword !== "" &&
      this.userGroup.value.Password !== ""
    ) {
      if (
        this.userGroup.value.Password !== this.userGroup.value.ConfirmPassword
      ) {
        return true;
      }
    } else return false;
  }
  isUserNameExist() {
    const userName = this.userGroup.value.UserName;
    if (userName != null && userName != "") {
      for (const user of this.users.values()) {
        if (user.userName === userName && !this.isEditModel) {
          return true;
        } else if (
          this.isEditModel &&
          user.userName === userName &&
          user.id !== this.userData.id
        ) {
          return true;
        }
      }
    }
    return false;
  }
  isEmailExist() {
    const em = this.userGroup.value.Email;
    if (em != null && em != "") {
      for (const user of this.users.values()) {
        if (user.email === em && !this.isEditModel) {
          return true;
        } else if (
          this.isEditModel &&
          user.email === em &&
          user.id !== this.userData.id
        ) {
          return true;
        }
      }
    }
    return false;
  }
  GetAllUsers() {
    this.service.GetAllUser().subscribe(
      (list) => {
        this.users = list;
      },
      (ex) => {
        console.log(ex);
      }
    );
  }
}
