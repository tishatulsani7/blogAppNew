import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  isLoggedIn:any=false;

  users:any[]=[]

  constructor() { 
    this.loadData()
  }

  loadData(){
    this.users=JSON.parse(localStorage.getItem("users") ?? "[]")
    this.isLoggedIn=localStorage.getItem("isLoggedIn")
    console.log(this.users,this.isLoggedIn)
  }

  
  insertUser(data:any){
    this.users.push(data)
    //localStorage takes key value pair
    localStorage.setItem("users",JSON.stringify(this.users))
  }

  selectUsers(){
    return this.users
  }

  updateLoggedIn(value:boolean){
    this.isLoggedIn=value;
    localStorage.setItem("isLoggedIn",this.isLoggedIn)
  }

}
