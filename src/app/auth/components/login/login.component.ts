import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../../services/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string= "";
  password:string= "";
  passtype:string= "password";
  loginForm= new FormGroup({
    username:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required])
  })
  constructor(private _usersServices:UserserviceService,private toastr: ToastrService, private _Router:Router)
 {

 } 

  ngOnInit(){
   
  }
  showpass() {
    if(this.passtype=="password") {
      this.passtype = 'text';
    }
    else {
      this.passtype = 'password';
    }
  }
    onLogin(data:FormGroup) {
    console.log(data.value,"data");
    this._usersServices.onLogin(data.value).subscribe({
      next:(res: any) => {
        console.log(res);
      },
      complete:() => {
        this.toastr.success("login sucesfully");
        localStorage.setItem('userToken',data.value.refreshToken)
        this._Router.navigate(['/users/list']);
      },
      error:(err) => {
        this.toastr.error("user name or password invalid");
      },
    })
  }
}
