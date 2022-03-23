import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup;

  constructor(private fromBuilder : FormBuilder, private http : HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.fromBuilder.group({
      fullname:['',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(8)]],
      mobile:['',[Validators.required, Validators.pattern("^[0-9]{10,11}$")]]
    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/signup", this.signupForm.value)
    .subscribe(res=>{
      alert("Successfull");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },
    err=>{
      alert("Unsuccessful")

    })

  }
  

}
