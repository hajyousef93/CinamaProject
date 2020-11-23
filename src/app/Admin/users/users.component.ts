import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/Models/user';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  showSpinner = true;
  
  constructor(
    private service:AdminService,
    private router:Router
    ) { }

  users:User[];
  numItemDelete:number;

  ngOnInit(): void {
    this.users=null;
    this.getUsers();


   
    
  }
  getUsers() {
    this.service.GetAllUser().subscribe(list=>{
      this.users=list;
      this.showSpinner = false;
      this.numItemDelete=0;
      },ex=>{
        console.log(ex);
      });
  }
  EditUser(id:string){
    this.router.navigate(['/EditUser',id]);
  }
  SelectAll(){
    
    var tbl= $('#tbl')
    var header = tbl.find('thead .ckheader');
    var item =tbl.find('tbody .ckitem');
  
    
    
    $(function(){
      item.on('change',function(){
        if ($(this).is(":checked")){
          $(this).closest('tr').addClass('NewRowColor');
        }else{
          $(this).closest('tr').removeClass('NewRowColor');
        }
      })
    });
    
    header.change(function(){
      var c =this.checked;
      item.prop("checked",c);
      item.trigger('check');
      if($(this).is(":checked")){
        $(item).closest('tr').addClass('NewRowColor');
      }else{
        $(item).closest('tr').removeClass('NewRowColor');
      }
    });


  }
  IsDelete(){
    var checkboxes= document.getElementsByClassName('ckitem');
    if(checkboxes.length >0){
      for(let i=0;i<checkboxes.length;i++){
        if($(checkboxes[i]).is(":checked"))
        return true;
      }
    }
    return false;
  }
  DeleteCount(){
    var count= $(" .ckitem:checked").length;
    this.numItemDelete=count;
  }
  ConfirmDelete(){
    var checkboxes= document.getElementsByClassName('ckitem');
    if(checkboxes.length >0){
      var ids= [];
      for(let i=0;i<checkboxes.length;i++){
        if($(checkboxes[i]).is(":checked")){
          var id=$(checkboxes[i]).val();
          ids.push(id);
        }
        
      }
     this.service.DeleteItem(ids).subscribe(x=>{
      this.getUsers();
      $("#butClose").trigger('click');
     },
     ex=>{
      console.log(ex);
    });
      
    }
  }

}
