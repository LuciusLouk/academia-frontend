import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unidad } from 'src/app/models/unidad/unidad';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  
  
  private hostBase:String;
  constructor(private _http:HttpClient) { 
    this.hostBase ="http://localhost:8080/";
  }

  public registrarUnidad(unidad:Unidad):Observable<any>{
    console.log("objeto ",unidad);
    return this._http.post(this.hostBase+"unidad",unidad);
  }

  public obtenerUnidad(cid:number,uid:number):Observable<any>{
    return this._http.get(this.hostBase+"curso/"+cid+"/unidad/"+uid);
  }
  
  public obtenerUnidadesDeCurso(id:number):Observable<any>{
    console.log("id curso ",id);
    return this._http.get(this.hostBase+"unidades/"+id);
  }

  public actualizarUnidad(obUnidad: Unidad):Observable<any> {
    throw new Error('Method not implemented.');
  }
  eliminarUnidad(unidadId: number):Observable<any> {
    return this._http.get(this.hostBase+"unidad/eliminar/"+unidadId);
  }
}
