import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso/curso';
import { Unidad } from 'src/app/models/unidad/unidad';
import { CursoService } from 'src/app/services/curso/curso.service';
import { UnidadService } from 'src/app/services/unidad/unidad.service';
import { CursoComponent } from '../../curso/curso/curso.component';

@Component({
  selector: 'app-form-unidad',
  templateUrl: './form-unidad.component.html',
  styleUrls: ['./form-unidad.component.css']
})
export class FormUnidadComponent {
  obUnidad:Unidad;
  cursoId:number;
  curso:Curso;
  unidades:Array<Unidad> = new Array;
  constructor(private unidadService:UnidadService,
              private route: ActivatedRoute,
              private cursoService:CursoService, private router:Router,
              private cursoPage:CursoComponent
  ) { 
    this.obUnidad = new Unidad();
    this.cursoId = Number(this.route.snapshot.paramMap.get('id'));
    this.curso = new  Curso();
    this.cursoId= 0;
    this.unidades = [];
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cursoId = Number(params.get('id'));
      //this.cargarCursoForm();
      //this.cargarUnidadesForm();
    });
  }

  registrarUnidad():void{
    console.log("id curso de unidad ",this.cursoId);
    let curso:Curso = new Curso();
    curso.id =this.cursoId;
    this.obUnidad.curso = curso;
    this.obUnidad.activo=true;
    this.unidadService.registrarUnidad(this.obUnidad).subscribe(
      (response:any)=>{
        console.log(response);
        this.cursoPage.cargarUnidades();
        alert("Unidad registrada correctamente");
        this.obUnidad = new Unidad();
      },(error:any)=>{
        console.log(error);
        alert("Error al registrar la unidad");
      }
    )
  }


  

  cargarCursoForm(){
    this.cursoService.obtenerCurso(this.cursoId).subscribe(
      (response:any)=>{
        console.log("Response cargarCurso",response);
        this.curso = response;
        console.log("I GET ",this.curso);
      }
    )
  }

  cargarUnidadesForm(){
    this.unidadService.obtenerUnidadesDeCurso(this.cursoId).subscribe(
      (response:any)=>{
        console.log("Response cargarUnidades",response);
        this.unidades = response;
        console.log("I GET ",this.unidades);
      },(error:any)=>{
        console.log("no se pudo cargar las unidades");
        console.log(error);
      }
    )
  }











}
