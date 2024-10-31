import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Docente } from 'src/app/models/docente/docente';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  hostBase:string;
  constructor(private _http:HttpClient) { 
    this.hostBase ="https://academia-backend-production-d122.up.railway.app/auth/";
  }


  public registrarDocente(docente:Docente):Observable<any>{
    const httpOption = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
        }) 
      }
    let body = JSON.stringify(docente);
    console.log(body);
    return this._http.post(this.hostBase+"docenteRegistro",body,httpOption);
  }
  public registrarAlumno(alumno:Alumno):Observable<any>{
    const httpOption = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
        }) 
      }
    let body = JSON.stringify(alumno);
    console.log(body);
    return this._http.post(this.hostBase+"alumnoRegistro",body,httpOption);
  }

}
