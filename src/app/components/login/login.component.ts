import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario:Usuario;
  returnUrl!: string;
  usuarioForm:Usuario;
  msglogin!: string; // mensaje que indica si no paso el login
  constructor(private route: ActivatedRoute,
              private loginService:LoginService,
              private router:Router,
              private jwtHelper: JwtHelperService
    ) {
    this.usuario = new Usuario();
    this.usuarioForm = new Usuario();
  }

  
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['app-tienda'];
  }

  /*
  public login():void{
    this.loginService.login(this.usuarioForm.nombreUsuario, this.usuarioForm.password).subscribe(
      (response:any)=>{
        console.log("response login ",response);
        this.usuario = response;
        //sessionStorage.setItem("user", String(this.usuario.nombreUsuario));
        sessionStorage.setItem("token", String(response.token));
        //sessionStorage.setItem("userid", String(this.usuario.id));
        //sessionStorage.setItem("perfil", this.usuario.rol);
        //redirigimos a home o a pagina que llamo
        this.router.navigate(['app-list-curso/'+this.usuario.id]);
      }
    )
  }*/

  public login():void{
    console.log("user form ",this.usuarioForm);
    this.loginService.login(this.usuarioForm.nombreUsuario, this.usuarioForm.password).subscribe(
      (result:any) => {
        if (result.token!=""){
          console.log("respuesta ",result);
          const decodedToken = this.jwtHelper.decodeToken(result.token);
          console.log("decode ",decodedToken);
          sessionStorage.setItem("token", result.token);
          
          //guardamos el user en cookies en el cliente
          sessionStorage.setItem("user", decodedToken["sub"]);
          sessionStorage.setItem("userid",  decodedToken["id"]);
          sessionStorage.setItem("rol",  decodedToken["rol"]);
          //redirigimos a home o a pagina que llamo
          this.router.navigate(['app-tienda'])
      } else {
        //usuario no encontrado muestro mensaje en la vista
        this.msglogin="Credenciales incorrectas..";
      }
    },error => {
      alert("Error de conexion");
      console.log("error en conexion ");
      console.log(error);
    });
  }

}
