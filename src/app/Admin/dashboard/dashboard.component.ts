import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
isUserList:boolean;
isAddUser:boolean;

  constructor() { }

  ngOnInit(): void {

    this.isUserList=false;
    this.isAddUser=false;


    // for jquory
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
    // 
  });
  }

  CheckUser():boolean{
  this.isAddUser=false;
  return this.isUserList=true;

  }
  AddUser(){
    this.isUserList=false;
    return this.isAddUser=true;
  }

}
