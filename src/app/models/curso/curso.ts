import { Docente } from "../docente/docente";
import { Unidad } from "../unidad/unidad";

export class Curso {
    id!:number;
    nombre:string;
    duracionMeses:number;
    precio:number;
    cupo:number;
    cantidadEgresados:number;
    descuento:number;
    modalidad:string;
    activo:boolean;
    fechaInicio:Date;
    imagen:string;
    unidades:Array<Unidad>;

    docente!:Docente;

    constructor() {
      this.id=0;
        this.nombre="";
        this.duracionMeses=0;
        this.precio=0;
        this.cupo=0;
        this.cantidadEgresados=0;
        this.descuento=0;
        this.modalidad=""; 
        this.activo=false;
        this.fechaInicio=new Date();
        this.imagen="";
        this.unidades=new Array<Unidad>();
    }

/*
    constructor(
        id: number,
        nombre: string,
        duracionMeses: number,
        precio: number,
        cupo: number,
        cantidadEgresados: number,
        descuento: number,
        modalidad: string,
        activo: boolean,
        fechaInicio: Date,
        imagen: string,
        unidades: Array<Unidad>
      ) {
        this.id = id;
        this.nombre = nombre;
        this.duracionMeses = duracionMeses;
        this.precio = precio;
        this.cupo = cupo;
        this.cantidadEgresados = cantidadEgresados;
        this.descuento = descuento;
        this.modalidad = modalidad;
        this.activo = activo;
        this.fechaInicio = fechaInicio;
        this.imagen = imagen;
        this.unidades = unidades;
      }*/
}
