import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seccion } from 'src/app/models/seccion/seccion';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {
  
  private hostBase:String;
  constructor(private _http:HttpClient) { 
    this.hostBase ="http://localhost:8080/";
  }

  public registrarSeccion(seccion:Seccion):Observable<any>{
    console.log("objeto ",seccion);
    return this._http.post(this.hostBase+"seccion",seccion);
  }


  
  public obtenerSeccionesDeUnidad(id:number):Observable<any>{
    console.log("id unidad ",id);
    return this._http.get(this.hostBase+"secciones/"+id);
  }

  eliminarSeccion(id: number):Observable<any> {
    return this._http.get(this.hostBase+"seccion/eliminar/"+id);
  }

}
