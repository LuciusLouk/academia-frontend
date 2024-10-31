import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private loginService:LoginService,
    private jwtHelper: JwtHelperService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token:String ="";
    token=sessionStorage.getItem("token")!;
    //token=this.loginService.userToken();
    if(token==null){
      token="";
    }
    //console.log("token interceptor "+token);
    if(token!=""){

      const decodedToken = this.jwtHelper.decodeToken(this.loginService.userToken());
      //const decodedToken: any = jwt_decode(token); // Decodifica el token
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp); // Convierte la fecha de expiración del token

      if (expirationDate < new Date()) {
        // Si el token ha expirado
        this.loginService.logout(); // Método que limpia la sesión y remueve el token
        //this.router.navigate(['/login']); // Redirige al usuario al login
        //return next.handle(req); // Interrumpe la solicitud
      }

      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json;charset=UTF-8', 
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
