import { Archivo } from "../archivo/archivo";
import { Unidad } from "../unidad/unidad";

export class Seccion {
    id:number;
    titulo:string;
    descripcion: string;
    unidad: Unidad;
    archivos:Array<Archivo>;

    constructor(){
        this.id = 0;
        this.titulo = '';
        this.descripcion = '';
        this.unidad = new Unidad();
        this.archivos = new Array<Archivo>();
    }
}
