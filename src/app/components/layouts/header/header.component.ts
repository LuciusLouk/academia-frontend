import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userId: number;
  constructor(public loginService: LoginService) { 
    /*
    const userId = sessionStorage.getItem("userid");
    this.userLogged =  userId ? Number(userId) : 0;
    */

    // En lugar de usar el storage, se puede usar el loginService para obtener el userId
    // this.userId = this.loginService.userId;  // Si se quiere usar el loginService para obtener el userId

    // En este caso, suponiendo que el userId se almacena en el loginService, se puede usar la siguiente línea:
    // this.userId = this.loginService.userId;  // Si se quiere usar el loginService para obtener el userId

    // Otra opción es usar la función userLogged() del loginService para obtener el userId
    // this.userId = this.loginService.userLogged();  // Si se quiere usar el loginService para obtener el userId

    // Otra opción es usar la función idLogged() del loginService para obtener el userId
    // this.userId = this.loginService.idLogged();  // Si se quiere usar el loginService para obtener el userId

    // O
    this.userId=0;
    if(sessionStorage.getItem("userid")!=null){
      this.userId = Number(sessionStorage.getItem("userid"));
    }
  }
  logout(){
  this.loginService.logout();
  }
}
