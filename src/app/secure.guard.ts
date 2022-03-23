import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class SecureGuard implements CanActivate {
  

  constructor( private auth:Auth,private router:Router){

  }
  
  canActivate(){
    if(this.auth.isLoggedin()){
      return true;
    }
    

    
    alert ("Please login")
    this.router.navigate(['login']);
    return false;
    

  }

    
  
  
}
