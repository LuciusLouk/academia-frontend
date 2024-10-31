import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Seccion } from 'src/app/models/seccion/seccion';
import { Unidad } from 'src/app/models/unidad/unidad';
import { SeccionService } from 'src/app/services/seccion/seccion.service';
import { UnidadComponent } from '../../unidad/unidad/unidad.component';

@Component({
  selector: 'app-form-seccion',
  templateUrl: './form-seccion.component.html',
  styleUrls: ['./form-seccion.component.css']
})
export class FormSeccionComponent {
  obSeccion:Seccion;
  unidadId: number;

  constructor(private domSanitizer: DomSanitizer,
              private seccionService:SeccionService,
              private route: ActivatedRoute,
              private unidadPage:UnidadComponent) { 
    this.obSeccion = new Seccion();
    
    this.unidadId = Number(this.route.snapshot.paramMap.get('unidadId'));
  }

  ngOnInit(): void {
    // Agregado suscripción a cambios de parámetros de ruta
    this.route.paramMap.subscribe(params => {
      this.unidadId = Number(params.get('unidadId'));
    });
  }


  registrarSeccion(){
    let unidad:Unidad = new Unidad();
    unidad.id = this.unidadId;
    this.obSeccion.unidad = unidad;
    this.seccionService.registrarSeccion(this.obSeccion).subscribe(
      (response:any)=>{
        console.log(response);
        this.obSeccion = new Seccion();
        this.unidadPage.cargarSecciones();
        alert("Contenido agregado");
      },(error:any)=>{
        console.log(error);
        alert("Error al registrar la sección");
      }
    )
  }


    

}
