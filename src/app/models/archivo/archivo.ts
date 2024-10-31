import { SafeUrl } from "@angular/platform-browser";
import { Seccion } from "../seccion/seccion";

export class Archivo {
    id:number;
    nombre:string;
    path: string;
    tipo: string;
    seccion: Seccion;

    safeUrl!:SafeUrl;
    constructor(){
        this.id = 0;
        this.nombre = '';
        this.path = '';
        this.tipo = '';
        this.seccion = new Seccion();
    }
}
