import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso/curso';
import { Unidad } from 'src/app/models/unidad/unidad';
import { ArchivoService } from 'src/app/services/archivo/archivo.service';
import { CursoService } from 'src/app/services/curso/curso.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UnidadService } from 'src/app/services/unidad/unidad.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent {
  cursoId: number;
  curso:Curso;
  userRol:string;
  unidades:Array<Unidad> = new Array;
  constructor(private readonly route: ActivatedRoute, 
              private readonly cursoService:CursoService,
              private readonly unidadService:UnidadService,
              private readonly archivoService:ArchivoService,
              private readonly loginService:LoginService,
              private router:Router) {
    this.curso = new  Curso();
    this.cursoId= 0;
    this.userRol = loginService.rolLogged();
    this.unidades = [];
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cursoId = Number(params.get('id'));
      this.cargarCurso();
    });
    
    this.cargarUnidades();
  }


  cargarCurso(){
    this.cursoService.obtenerCurso(this.cursoId).subscribe(
      (response:any)=>{
        console.log("Response cargarCurso",response);
        Object.assign(this.curso,response);
        //this.cargarArchivo();

        
          //this.cursoService.cargarArchivo(this.curso);
        console.log("Curso cargado ",this.curso);
      }
    )
  }

  cargarUnidades(){
    this.unidadService.obtenerUnidadesDeCurso(this.cursoId).subscribe(
      (response:any)=>{
        //console.log("Response cargarUnidades",response);
        this.unidades = response;
        //console.log("I GET ",this.unidades);
      },(error:any)=>{
        console.log("no se pudo cargar las unidades");
        console.log(error);
      }
    )
  }
/*
  cargarArchivo(){
    this.curso.imagen = this.archivoService.getFileUrl(this.getFileNameFromUrl(this.curso.imagen));
  }
  getFileNameFromUrl(url: string): string {
    const index = url.lastIndexOf("images\\") + "images\\".length;
    return url.substring(index);
  }
*/
  cambiarEstadoCurso(){
    this.cursoService.cambiarEstado(this.cursoId).subscribe(
      (response:any)=>{
        console.log("Response cambiar estadoCurso",response);
        this.cargarCurso();
        alert("Se cambio visibilidad del curso");
      },(error:any)=>{
        console.log("no se pudo cambiar el estado del curso");
        console.log(error);
      }
    )
  }

  redirigirModificar(){
    this.router.navigate(['app-form-curso/',this.cursoId]);
  }

  eliminarCurso() {
    if (confirm("¿Estás seguro de que deseas eliminar estE CURSO?")) {
      this.cursoService.eliminarCurso(this.cursoId).subscribe({
        next: () => {
          alert("Curso eliminado");
          this.router.navigate(['app-list-curso']);
        },
        error: (error) => {
          console.error('Error al eliminar el curso:', error);
          alert("Error al eliminar CURSO");
        }
      })
  
    }else{
      alert("Eliminación cancelada");
    }

  }
}
