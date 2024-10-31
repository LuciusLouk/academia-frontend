import { Curso } from "../curso/curso";
import { Seccion } from "../seccion/seccion";

export class Unidad {
    id:number;
    titulo:string;
    descripcion:string;
    activo:boolean;
    curso!:Curso;
    unidadPadre!:Unidad;
    archivo:string;
    
    secciones:Array<Seccion>;
    constructor(){
      this.id = 0;
      this.titulo = "";
      this.descripcion = "";
      this.activo = false;
      this.secciones = new Array<Seccion>();
      //this.curso = new Curso(0,"",0,0,0,0,0,"",false,new Date(),"",new Array());
      //this.unidadPadre = new Unidad();
      this.archivo = "";
    }
/*
    constructor() {
        this.id = 0;
        this.numeroDeUnidad = 0;
        this.titulo = "";
        this.descripcion = "";
        this.archivo = "";
    }*/

}
