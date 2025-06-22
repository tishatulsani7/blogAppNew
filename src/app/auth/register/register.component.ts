import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usernameError=false

  constructor(private databaseService:DatabaseService){

  }
  ngOnInit(){
    this.subscribeToUserNameChanges();
  }

  registerFormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    fullName:new FormControl('',[Validators.required]),
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required]),
    dob:new FormControl('',[Validators.required]),
    // profileImg:new FormControl('',[Validators.required]),
    bio:new FormControl('',[Validators.required])
  })

  getFormControl(name:string){
    return this.registerFormGroup.get(name)
  }

  isFormControlError(name:string){
    return this.getFormControl(name)?.dirty && this.getFormControl(name)?.errors?.['required']
  }

  checkPassword(){
    return this.getFormControl('password')?.value!=this.getFormControl('confirmPassword')?.value
    && this.getFormControl('password')?.dirty
    && this.getFormControl('confirmPassword')?.dirty
    && this.getFormControl('password')?.touched
    && this.getFormControl('confirmPassword')?.touched
  }

  submitData(){
    console.log(this.registerFormGroup.value)
    let value=this.registerFormGroup.value;
    this.databaseService.insertUser(value);
    console.log(this.databaseService.selectUsers())
    this.registerFormGroup.reset()
  }

  subscribeToUserNameChanges(){
    this.registerFormGroup.get('username')?.valueChanges.subscribe
    ((value:any)=>{
      let users=this.databaseService.selectUsers();
      for(let user of users){
        if(value && user.username.trim()===value.trim()){
          this.usernameError=true;
          break;
        }else{
          this.usernameError=false;
        }
      }
    })
  }

}
