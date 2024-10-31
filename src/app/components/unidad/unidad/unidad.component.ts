import { Component, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Archivo } from 'src/app/models/archivo/archivo';
import { Seccion } from 'src/app/models/seccion/seccion';
import { Unidad } from 'src/app/models/unidad/unidad';
import { ArchivoService } from 'src/app/services/archivo/archivo.service';
import { LoginService } from 'src/app/services/login/login.service';
import { SeccionService } from 'src/app/services/seccion/seccion.service';
import { UnidadService } from 'src/app/services/unidad/unidad.service';
import { CursoComponent } from '../../curso/curso/curso.component';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent implements PipeTransform{
  idSeccionAlta:number=0;
  safeUrl!: SafeUrl;


  unidadId: number;
  cursoId:number;
  idSeccion:number;
  //Unidad cargada
  unidad:Unidad;
  //Unidad para modificar
  obUnidad:Unidad;
  //Sección para modificar
  obSeccion:Seccion;

  archivo:Archivo;
  secciones:Array<Seccion>=[];
  archivos:Array<Archivo>=[];

  userRol:string;
  imagen:string = "assets/icon.svg";


  files: { base: string, safeurl: SafeUrl }[] = [];
  
  constructor(private readonly route: ActivatedRoute,
              private readonly cursoPage:CursoComponent,
              private readonly domSanitizer: DomSanitizer,
              private readonly seccionService:SeccionService,
              private readonly unidadService:UnidadService,
              private readonly archivoService:ArchivoService,
              private readonly loginService:LoginService,
              private readonly router: Router) {
    this.unidad = new Unidad();
    this.idSeccion=-1;
    this.obUnidad = new Unidad();
    this.obSeccion = new Seccion();
    this.archivo = new Archivo();
    this.unidadId = Number(this.route.snapshot.paramMap.get('unidadId'));
    this.cursoId = 0;

    this.cursoId = Number(this.route.snapshot.paramMap.get("id"));
    this.userRol = loginService.rolLogged();
  }

  ngOnInit(): void {
    // Agregado suscripción a cambios de parámetros de ruta
    this.route.paramMap.subscribe(params => {
      this.unidadId = Number(params.get('unidadId'));
      
      this.cursoId = Number(this.route.snapshot.paramMap.get("id"));
      this.cargarUnidad();
      this.cargarSecciones();
    });
  }

  cargarUnidad():void{
    console.log("UnidadId: ",this.unidadId);
    console.log("curso id ", this.cursoId);
    this.unidadService.obtenerUnidad(this.cursoId,this.unidadId).subscribe({
      next:(response:any)=>{
        //console.log(response);
        this.unidad = response;
        this.secciones = this.unidad.secciones;
        this.cargarArchivos()
        //console.log(this.unidad);
      },error:(error:any)=>{
        console.log(error);
        alert("Error al cargar la unidad");
      }
  })
  }
  prepararSeccion(seccion:Seccion){
    this.obSeccion = seccion;
    this.obSeccion.unidad.id = this.unidadId;
  }

  registrarSeccion(){
    let unidad:Unidad = new Unidad();
    unidad.id = this.unidadId;
    this.obSeccion.unidad = unidad;
    this.seccionService.registrarSeccion(this.obSeccion).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.obSeccion = new Seccion();

        
    this.unidad = new Unidad();
    this.obUnidad = new Unidad();
    this.obSeccion = new Seccion();
    this.archivo = new Archivo();
        this.cargarSecciones();
        alert("Contenido agregado");
      },error:(error:any)=>{
        console.log(error);
        alert("Error al registrar la sección");
      }
  })
  }

  prepararUnidad(){
    this.obUnidad = this.unidad;
    this.obUnidad.curso.id=this.cursoId;
    console.log("unidad preparada para modificar ",this.obUnidad);
  }
  modificarUnidad(){
    //console.log("Unidad a modificar: ",this.obUnidad);
    this.unidadService.registrarUnidad(this.obUnidad).subscribe({
      next:(response:any)=>{
        //console.log(response);
        alert("Unidad modificada correctamente");

        this.unidad = new Unidad();
        this.obUnidad = new Unidad();
        this.obSeccion = new Seccion();
        this.archivo = new Archivo();

        this.cargarUnidad();
      },error:(error:any)=>{
        console.log(error);
        alert("Error al modificar la unidad");
      }
  })
  }

  cargarSecciones(){
    this.seccionService.obtenerSeccionesDeUnidad(this.unidadId).subscribe({
      next:(response:any)=>{
        //console.log("Reponse carga secciones",response);
        this.secciones = response;
        
        this.cargarArchivos();
        console.log("Secciones cargadas",this.secciones);
      },error:(error:any)=>{
        console.log(error);
        alert("Error al cargar las secciones");
      }
  })
  }

  eliminarSeccion(id:number){
    if (confirm("¿Estás seguro de que deseas eliminar esta sección?")) {
      this.seccionService.eliminarSeccion(id).subscribe({
        next:(response:any)=>{
          this.unidad = new Unidad();
          this.obUnidad = new Unidad();
          this.obSeccion = new Seccion();
          this.archivo = new Archivo();
  
          this.cargarUnidad();
          this.cargarSecciones();
          
          alert("seccion eliminada");
        },error:(error:any)=>{
          console.log(error);
          alert("Error al eliminar");
        }
    })
    }else{
      alert("Eliminación cancelada");
    }
    
  }

  eliminarArchivo(idArchivo:number){
    if (confirm("¿Estás seguro de que deseas eliminar este archivo?")) {
      this.archivoService.eliminarArchivo(idArchivo).subscribe(
        (response: any) => {
          alert("Archivo eliminado");
          this.cargarSecciones();
          
    this.unidad = new Unidad();
    this.obUnidad = new Unidad();
    this.obSeccion = new Seccion();
    this.archivo = new Archivo();
        }
      );
    } else {
      alert("Eliminación cancelada");
    }
  }
  cargarArchivos(){
    for(const element of this.secciones){
      //console.log("Elemento: ",element);
      if(element.archivos == null){
        this.archivoService.obtenerSeccionesDeUnidad(element.id).subscribe({
          next: (response:any)=>{
            console.log("RESPONSE ARCHIVOS CARGADOS ",response);
            element.archivos = response;
            for(const archivo of element.archivos){
              archivo.path = this.archivoService.getFileUrl(this.getFileNameFromUrl(archivo.path));
              if (archivo.tipo === 'youtube') {
                archivo.safeUrl = this.transform(archivo.nombre);  // Transforma la URL solo una vez
              }
            }
            console.log("Archivos cargados ",element.archivos);
          },
          error: (error:any)=>{
            console.log(error);
            alert("Error al cargar los archivos");
          }
      })
      }
      
      
    }
  }
  transform(url: string): SafeResourceUrl {
    // Comprobamos si la URL contiene el parámetro "watch?v="
    const videoId = this.extractVideoID(url);

    // Si existe el ID del video, lo añadimos al formato embed
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.domSanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    // Si no se encuentra el ID, devolvemos una URL segura pero vacía
    return this.domSanitizer.bypassSecurityTrustResourceUrl('');
  }

  // Función para extraer el ID del video de la URL
  private extractVideoID(url: string): string | null {
    const videoIDMatch = /[?&]v=([^&#]*)/.exec(url);
    //const videoIDMatch = url.match('[\\?&]v=([^&#]*)');
    return videoIDMatch ? videoIDMatch[1] : null;
  }
  getFileNameFromUrl(url: string): string {
    const index = url.lastIndexOf("images\\") + "images\\".length;
    return url.substring(index);
}

  onFileSelected(event: any) {
    const files = event.target.files;
    const file = files[0];
    //inicio lector de archivo
    const reader = new FileReader();
    //declaro el comportamiento del onload cuando el reader carga o lee algo
    reader.onload = () => {
      let base = reader.result as string;
      let safeurl:SafeUrl = this.domSanitizer.bypassSecurityTrustUrl(base);
      //console.log("FILES: ",this.files);
      this.files.unshift({ 'base': base, 'safeurl': safeurl });

      //Guarda el base64 en foto de perfil
      //this.cuenta.fotoPerfil = this.files[0].base;
      this.archivo.path = this.files[0].base;
      //console.log("BASE 64: ",base);
      //console.log("FILE ",file);
      //console.log("SAFEURL: ",this.files[0].safeurl);
      //console.log("length", base.length);
      if(this.files.length>0){
        this.files.pop();
      } 
    };
    //hago que el reader lea un archivo
    reader.readAsDataURL(file);

  }
  registrarArchivo(idSeccion:number){
    console.log("seccion id ",idSeccion)
    console.log("preparado id ",this.idSeccionAlta);
    this.archivo.seccion = new Seccion();
    this.archivo.seccion.id = this.idSeccionAlta;  
    if(this.archivo.tipo=="youtube"){ 
      this.archivo.path = this.archivo.nombre;
    }
    this.archivoService.registrarSeccion(this.archivo).subscribe({
      next:(response:any)=>{
        //console.log(response);
        this.archivo = new Archivo();
        this.cargarSecciones();
    this.unidad = new Unidad();
    this.obUnidad = new Unidad();
    this.obSeccion = new Seccion();
    this.archivo = new Archivo();
      },
      error:(error:any)=>{
        console.log(error);
        alert("Error al registrar el archivo");
      }
  })
  }

  prepararFormArchivo(idSeccion:number){
    this.idSeccionAlta = idSeccion;
  }
  cancelarAltaArchivo(){
    this.idSeccionAlta=0;
    
    this.archivo = new Archivo();
  }

  eliminarUnidad() {
    if (confirm("¿Estás seguro de que deseas eliminar esta UNIDAD?")) {
      this.unidadService.eliminarUnidad(this.unidadId).subscribe({
        next: () => {
          this.cursoPage.cargarUnidades();
          alert("Unidad eliminada");
          this.router.navigate(['/curso',this.cursoId]);
        },
        error: (error) => {
          console.error('Error al eliminar la unidad:', error);
          alert("Error al eliminar la unidad");
        }
      })
  
    }else{
      alert("Eliminación cancelada");
    }

  }
}
