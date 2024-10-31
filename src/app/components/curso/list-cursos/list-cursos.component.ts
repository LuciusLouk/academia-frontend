import { Component } from '@angular/core';
import { Curso } from 'src/app/models/curso/curso';
import { Unidad } from 'src/app/models/unidad/unidad';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso/curso.service';
import { ArchivoService } from 'src/app/services/archivo/archivo.service';
import { LoginService } from 'src/app/services/login/login.service';
@Component({
  selector: 'app-list-cursos',
  templateUrl: './list-cursos.component.html',
  styleUrls: ['./list-cursos.component.css']
})
export class ListCursosComponent {
  cursos: Curso[] = []; 
  //idDocente:number;
  userId:number;
  userRol:string;
  constructor(private cursoService:CursoService,
              private route: ActivatedRoute,
              private archivoService:ArchivoService,
              private router:Router,
              private loginService:LoginService){

    //this.idDocente = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = loginService.idLogged();
    this.userRol = loginService.rolLogged();
                
    if(this.userRol=="DOCENTE"){
      this.cargarCursosDocente();
    }else if(this.userRol=="ALUMNO"){
      this. cargarCursosAlumno();
    }
  }

  cargarCursosAlumno(){
    this.cursoService.obtenerCursosDeAlumno(this.userId).subscribe(
      cursos => {
        this.cursos = cursos;
        console.log(this.cursos); 
      },
      error => console.error(error)
    )
  }

  cargarCursosDocente(){
    this.cursoService.obtenerCursosDeDocente(this.userId).subscribe(
      cursos => {
        this.cursos = cursos;
        console.log(this.cursos); 
        
        /*
for(let c of this.cursos){
          this.cursoService.cargarArchivo(c);
        }

        for(const element of this.cursos){
          element.imagen = this.archivoService.getFileUrl(this.getFileNameFromUrl(element.imagen));
        }
          */
      },
      error => console.error(error)
    )
  }

  /*
  getFileNameFromUrl(url: string): string {
    const index = url.lastIndexOf("images\\") + "images\\".length;
    return url.substring(index);
}*/


}
