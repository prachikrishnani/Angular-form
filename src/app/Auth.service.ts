import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class Auth {
    constructor() { }
    isLoggedin() {
        return localStorage.getItem('token');

    }

}