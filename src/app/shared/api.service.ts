import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {map}from 'rxjs/operators'
import { identifierName } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  postuser(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getuser(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateuser(data:any, age:number){
    return this.http.put<any>("http://localhost:3000/posts/"+ age,data)
    .pipe(map((res:any)=>{
      return res;
    }))

  }
  deleteuser(age:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+age)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  
  
}
