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
    const email=localStorage.getItem('email');
    const role=localStorage.getItem('role');
    const expire=localStorage.getItem('expire');
    if(email!=null&&role!=null&&expire!=null){
      if(!!this.auth.checkStorage()){
        
        this.Logout();
      }
  }
  }


  Logout()
  {
    this.service.LogoutUser().subscribe(success=>{  
      localStorage.clear();
      this.route.navigate(["Home"]);
     
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
}
