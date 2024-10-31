import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCursosComponent } from './components/curso/list-cursos/list-cursos.component';
//import { ItemCursoComponent } from './components/curso/item-curso/item-curso.component';
//import { FormPagoComponent } from './components/pago/form-pago/form-pago.component';
import { CursoComponent } from './components/curso/curso/curso.component';
import { SignupDocenteComponent } from './components/signup/signup-docente/signup-docente.component';
import { LoginComponent } from './components/login/login.component';
import { SignupAlumnoComponent } from './components/signup/signup-alumno/signup-alumno.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { CursoVentaComponent } from './components/curso-venta/curso-venta.component';
import { CheckoutComponentComponent } from './components/checkout-component/checkout-component.component';
import { UnidadComponent } from './components/unidad/unidad/unidad.component';
import { FormCursoComponent } from './components/curso/form-curso/form-curso.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  //{path:"app-login",component:LoginComponent},
  {path:"app-form-curso/:id",component:FormCursoComponent},
  {path:"app-list-curso",component:ListCursosComponent},
  //{path:"app-item-curso",component:ItemCursoComponent},
  {path:"app-curso-venta/:id",component:CursoVentaComponent},
  
  {path:"app-login",component:LoginComponent},
  {path:"app-signup-docente",component:SignupDocenteComponent},
  {path:"app-signup-alumno",component:SignupAlumnoComponent},

  {path:"app-perfil",component:PerfilComponent},
  {path:"app-tienda",component:TiendaComponent},

  {path:"app-checkout/:id",component:CheckoutComponentComponent},

  { path: 'curso/:id', component: CursoComponent, children: [
    { path: 'c/:id/u/:unidadId', component: UnidadComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
