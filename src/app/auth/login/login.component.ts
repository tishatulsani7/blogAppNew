import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  inValidCredentials:any=false;

  constructor(private databaseService:DatabaseService,private router:Router ){
  
  }
  loginFormGroup=new FormGroup({
      username:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
    })


    getFormControl(name:string){
    return this.loginFormGroup.get(name)
  }

  isFormControlError(name:string){
    return this.getFormControl(name)?.dirty && this.getFormControl(name)?.errors?.['required']
  }

  submitForm(){
    console.log(this.loginFormGroup.value)
    this.validateLogin(this.loginFormGroup.get('username')?.value,
    this.loginFormGroup.get('password')?.value)
  }

  validateLogin(username:any,password:any){
    let users=this.databaseService.selectUsers();
    for(let user of users){
      if(user.username===username && user.password===password){
        this.databaseService.updateLoggedIn(true);
        this.router.navigate(['home'])
      }else{
        this.inValidCredentials=true;
      }
    }
  }
}
// this.router.navigate(['home'])
//navigate mai array dena padtay agar bina array krnay toh navigateByUrl
