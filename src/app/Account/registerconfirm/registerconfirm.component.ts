import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-registerconfirm',
  templateUrl: './registerconfirm.component.html',
  styleUrls: ['./registerconfirm.component.css']
})
export class RegisterconfirmComponent implements OnInit {

  constructor(
    private activeRoute:ActivatedRoute,
    private sevice:RegisterServiceService
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(param=>{
      const id=param['ID'];
      const token=param['token'];
      if(id&&token){
        console.log('ID:'+id+" Token:"+token);
        this.sevice.EmailConfirm(id,token).subscribe(success=>
          console.log("success"),
          ex=>console.log(ex)
          );
      }
    },ex=>{
      console.log(ex);
    });
  }

}
