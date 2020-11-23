import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from '../services/register-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private service:RegisterServiceService,private route:Router,private auth:AuthService) { }
  title = 'Cinama-Movies';
  ngOnInit(): void {
    if(this.isUserRegistered()){
      if(this.auth.IsExpiredDate(this.auth.expire)===true){
         this.Logout();
         
     }
     this.auth.ValidetUser(this.auth.email,this.auth.role).subscribe(success=>{
      console.log('UserAuthoriz');
      },error=>{
        console.log(error);
        this.Logout();
      });
    }
    
  }


  Logout()
  {
    this.service.LogoutUser().subscribe(succ=>{ 
      localStorage.clear();
      console.log("authorize return false");
      this.route.navigate(['Home']);
    },
    error=>{
      console.log(error);
    });
    
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

  IsAdmin(){
    if(this.auth.role.toLowerCase()==="admin" && this.isUserRegistered()){
      return true;
    }
    return false;
  }
}
