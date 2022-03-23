import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecureGuard } from '../secure.guard';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(8)]]

    })
  }
  
  login() {
    this.http.get<any>("http://localhost:3000/signup")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if (user) {
          localStorage.setItem('token',`email:${this.loginForm.value.email}`)
          alert("Login Successfull")
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        
        }
        else{
          alert("Invalid details")
          this.loginForm.reset();
        }
      },
      err => {
        alert("Something went wrong");
        this.loginForm.reset();
        })
      }
    
 
}
