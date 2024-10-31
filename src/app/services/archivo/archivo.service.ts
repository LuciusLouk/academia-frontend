import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Archivo } from 'src/app/models/archivo/archivo';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
  
  private hostBase:String;
  constructor(private _http:HttpClient) { 
    this.hostBase ="http://localhost:8080/";
  }

  public registrarSeccion(archivo:Archivo):Observable<any>{
    console.log("objeto ",archivo);
    let body = JSON.stringify(archivo);
    return this._http.post(this.hostBase+"archivo",body);
  }

  eliminarArchivo(idArchivo: number):Observable<any> {
    return this._http.get(this.hostBase+"archivo/eliminar/"+idArchivo);
  }
  
  public obtenerSeccionesDeUnidad(id:number):Observable<any>{
    console.log("id archivo ",id);
    return this._http.get(this.hostBase+"files/archivos/"+id);
  }



  getFileUrl(filename: string): string {
    return `${this.hostBase}files/${filename}`;
  }
}
