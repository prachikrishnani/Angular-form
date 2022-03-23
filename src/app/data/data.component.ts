import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { userModel } from './user-dashboard.module';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  formValue !: FormGroup;
  userModelObj : userModel= new userModel();
  userData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder: FormBuilder,
    private api : ApiService){}

  ngOnInit(): void {
    this.formValue= this.formbuilder.group({
      first_name:['',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      last_name:['',[Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      age:['',[Validators.required, Validators.pattern("^[0-9]{1,2}$")]],
      mobile_number:['',[Validators.required,Validators.pattern("^[0-9]{10,11}$")]]
    })
    this.getAllUser();
  }
  postUserDetails(){
    this.userModelObj.first_name= this.formValue.value.first_name;
    this.userModelObj.last_name= this.formValue.value.last_name;
    this.userModelObj.age=this.formValue.value.age;
    this.userModelObj.mobile_number=this.formValue.value.mobile_number;

    this.api.postuser(this.userModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("User added successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();

    },
    err=>{
      alert("something went wrong");
    })

  }
  getAllUser(){
    this.api.getuser()
    .subscribe(res=>{
      this.userData = res;
    })
  }
  deletUser(row : any){
    this.api.deleteuser(row.id)
    .subscribe(res=>{
     alert("User deleted")
     this.getAllUser();
   })

  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.userModelObj.id = row.id;
    this.formValue.controls['first_name'].setValue(row.first_name);
    this.formValue.controls['last_name'].setValue(row.last_name);
    this.formValue.controls['mobile_number'].setValue(row.mobile_number);
    this.formValue.controls['age'].setValue(row.age);
    
    
  }
  clickAddUser(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;


  }
  updateUserDetails(){
    
    this.userModelObj.first_name= this.formValue.value.first_name;
    this.userModelObj.last_name= this.formValue.value.last_name;
    this.userModelObj.age=this.formValue.value.age;
    this.userModelObj.mobile_number=this.formValue.value.mobile_number;
    this.api.updateuser(this.userModelObj, this.userModelObj.id)
    .subscribe(res=>{
      alert("Updated")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();

    })

  }
  clearStorage(){
    localStorage.clear();
  }

  
}
