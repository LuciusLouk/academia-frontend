import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FormCursoComponent } from './components/curso/form-curso/form-curso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCursosComponent } from './components/curso/list-cursos/list-cursos.component';
//import { ItemCursoComponent } from './components/curso/item-curso/item-curso.component';
//import { FormPagoComponent } from './components/pago/form-pago/form-pago.component';
import { CursoComponent } from './components/curso/curso/curso.component';
import { SignupDocenteComponent } from './components/signup/signup-docente/signup-docente.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login/login.service';
import { FormSeccionComponent } from './components/seccion/form-seccion/form-seccion.component';
import { SignupAlumnoComponent } from './components/signup/signup-alumno/signup-alumno.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { CursoVentaComponent } from './components/curso-venta/curso-venta.component';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { CheckoutComponentComponent } from './components/checkout-component/checkout-component.component';
import { FormUnidadComponent } from './components/unidad/form-unidad/form-unidad.component';
import { UnidadComponent } from './components/unidad/unidad/unidad.component';

//import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FormCursoComponent,
    ListCursosComponent,
    //ItemCursoComponent,
    //FormPagoComponent,
    FormUnidadComponent,
    CursoComponent,
    UnidadComponent,
    SignupDocenteComponent,
    LoginComponent,
    FormSeccionComponent,
    SignupAlumnoComponent,
    PerfilComponent,
    TiendaComponent,
    CursoVentaComponent,
    CheckoutComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token'); // Método para obtener el token de donde lo hayas almacenado (por ejemplo, en el almacenamiento local)
        }
      }
    })
  ],
  providers: [
    LoginService,
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    
    //{provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
