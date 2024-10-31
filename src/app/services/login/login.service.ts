import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  hostBase:string;
  constructor(private _http:HttpClient) { 
    this.hostBase ="https://academia-backend-production-d122.up.railway.app/auth/";
  }

  public login(username:string,pass:string):Observable<any>{
    const httpOption = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
        }) 
      }
    let body = JSON.stringify({username:username,
    password:pass});
    console.log(body);
    return this._http.post(this.hostBase+"login",body,httpOption);
  }


  public logout() {
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("token");
  } 


  
  public isUserLoggedIn(){
    let resultado = false;
    let usuario = sessionStorage.getItem("user");
    if(usuario!=null){
    resultado = true;
    }
    return resultado;
    }

    public userLogged(){
    return sessionStorage.getItem("user")??"none";
    }

    public idLogged():number{
      return Number(sessionStorage.getItem("userid")) ?? 0;
    }
    public rolLogged(){
      return sessionStorage.getItem("rol")??"none";
    }

    public userToken():string{
      return sessionStorage.getItem("token")??"none";
    }
}
