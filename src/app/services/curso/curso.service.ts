import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/models/curso/curso';
import { ArchivoService } from '../archivo/archivo.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  
  
  
  hostBase:string;
  token:string=sessionStorage.getItem("token")!;
  constructor(private _http:HttpClient,private archivoService:ArchivoService) { 
    this.hostBase ="http://localhost:8080/";
  }

  public registrarCurso(curso:Curso):Observable<any>{
    
    let body = JSON.stringify(curso);
    console.log(body);
    return this._http.post(this.hostBase+"curso",body);
  }


  public obtenerCurso(id:number):Observable<any>{
    return this._http.get(this.hostBase+"curso/"+id);
  }
  public obtenerCursoVenta(id:number):Observable<any>{
    return this._http.get(this.hostBase+"auth/cursoventa/"+id);
  }

  public obtenerCursosDeDocente(id:number):Observable<any>{
    return this._http.get(this.hostBase+"curso/docente/"+id);
  }
  
  public obtenerCursosDeAlumno(id:number):Observable<any>{
    return this._http.get(this.hostBase+"curso/alumno/"+id);
  }

  public cambiarEstado(id:number):Observable<any>{
    return this._http.get(this.hostBase+"curso/estado/"+id);
  }

  public obtenerCursosActivos():Observable<any>{
    return this._http.get(this.hostBase+"cursos/activos");
  }


  cargarArchivo(curso:Curso):Curso{
    console.log("imagen de curso en curso service",curso.imagen)
    curso.imagen = this.archivoService.getFileUrl(this.getFileNameFromUrl(curso.imagen));
    return curso;
  }
  getFileNameFromUrl(url: string): string {
    const index = url.lastIndexOf("images\\") + "images\\".length;
    return url.substring(index);
  }


  registrarAlumnoCurso(alumnoId:number,cursoId:number):Observable<any>{
    console.log(alumnoId,cursoId);
    return this._http.post(this.hostBase+"registroAlumnoCurso/"+alumnoId+"&"+cursoId,null)
  }

  verificarPuedeComprar(cursoId: number):Observable<any> {
    return this._http.get(this.hostBase+"auth/comprar/"+cursoId);
  }
  actualizarCurso(obCurso: Curso):Observable<any> {
    let body = JSON.stringify(obCurso);
    console.log(body);
    return this._http.post(this.hostBase+"curso/modificar/",body);
  }
  eliminarCurso(cursoId: number):Observable<any> {
    return this._http.get(this.hostBase+"curso/eliminar/"+cursoId);
  }
}
