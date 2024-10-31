import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso/curso';
import { Docente } from 'src/app/models/docente/docente';
import { CursoService } from 'src/app/services/curso/curso.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.css']
})
export class FormCursoComponent {
  obCurso:Curso;
  checkDescuento:boolean;
  idDocente=1;
  cambioImagen:boolean;
  userRol:string;

  imageForm!: FormGroup;
  cursoId:number;
  imagen:string = "assets/work1.webp";
  file:any;

  files: { base: string, safeurl: SafeUrl }[] = [];
  constructor(private readonly cursoService:CursoService,
              private readonly route: ActivatedRoute, 
              private readonly router:Router,
              private readonly domSanitizer: DomSanitizer,
              private readonly loginService:LoginService
  ) {
    this.userRol="";
    this.cursoId = 0;
    this.userRol= this.loginService.rolLogged();
    this.obCurso = new Curso();
    this.cambioImagen=false;
    this.checkDescuento=false;

  }	
  
  ngOnInit():void{
    this.route.paramMap.subscribe(params => {
      this.cursoId = Number(params.get('id'));
    });
    if(this.cursoId!=0){
      this.cargarCurso();
    }
    let safeurl:SafeUrl = this.domSanitizer.bypassSecurityTrustUrl(this.imagen);
    this.files.unshift({ 'base': this.imagen, 'safeurl': safeurl });
    this.imageForm = new FormGroup({
      name:new FormControl(null,Validators.required),
      file:new FormControl(null,Validators.required)
    });
  }
  cargarCurso(){

    this.cursoService.obtenerCurso(this.cursoId).subscribe(
      (response:any)=>{
        if(this.files.length>0){
          this.files.pop();
        } 
        console.log("tamaño de files ",this.files.length);
        Object.assign(this.obCurso,response); 


        
        let safeurl:SafeUrl = this.domSanitizer.bypassSecurityTrustUrl(this.obCurso.imagen);
        this.files.unshift({ 'base': this.obCurso.imagen, 'safeurl': safeurl });   
          //this.cursoService.cargarArchivo(this.curso);
          
        this.obCurso.imagen = this.files[0].base;
        console.log("imagen ", this.obCurso.imagen );
        console.log("Curso cargado ",this.obCurso);
      }
    )
  }
  registrarCurso(){
    if(this.userRol=="DOCENTE" && this.cursoId==0){
      console.log(this.obCurso);
      let docente:Docente = new Docente();
      const userId = sessionStorage.getItem("userid");
      docente.id =  userId ? Number(userId) : 0;
      this.obCurso.docente = docente;
      this.cursoService.registrarCurso(this.obCurso).subscribe(
        data=>{
          alert("curso registrado");
          this.router.navigate(['app-list-curso']);
        })
      }

  }

  modificarCurso(){
    if(this.userRol=="DOCENTE" && this.cursoId!=0){
      let docente:Docente = new Docente();
      const userId = sessionStorage.getItem("userid");
      docente.id =  userId ? Number(userId) : 0;
      this.obCurso.docente = docente;
      if(!this.cambioImagen){
        this.obCurso.imagen = "";
      }
      console.log("curso a modificar a",this.obCurso);
      this.cursoService.actualizarCurso(this.obCurso).subscribe({
        next:(response:any)=>{
          alert("curso actualizado");
          this.router.navigate(['app-list-curso']);
        }
    })
    }
  }

  onFileSelected(event: any) {
    this.cambioImagen = true;
    const files = event.target.files;
    const file = files[0];
    //inicio lector de archivo
    const reader = new FileReader();
    //declaro el comportamiento del onload cuando el reader carga o lee algo
    reader.onload = () => {
      let base = reader.result as string;
      let safeurl:SafeUrl = this.domSanitizer.bypassSecurityTrustUrl(base);
      this.files.unshift({ 'base': base, 'safeurl': safeurl });

      //Guarda el base64 en foto de perfil
      this.obCurso.imagen = this.files[0].base;
      if(this.files.length>0){
        this.files.pop();
      } 
    };
    //hago que el reader lea un archivo
    reader.readAsDataURL(file);

  }
/*
  onSubmit(){
    const form  = this.imageForm;
    console.log(this.file);
    if(form.valid){
      console.log("subiendo imagen");
      /*
      this.imageService.uploadImages(form.value.name,this.file).subscribe(data=>{
        this.imageForm = new FormGroup({
          name:new FormControl(null),
          file:new FormControl(null)
        })
      })
    }
  }*/
}
