import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso/curso';
import { ArchivoService } from 'src/app/services/archivo/archivo.service';
import { CursoService } from 'src/app/services/curso/curso.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  constructor(private cursoService:CursoService,
              private route: ActivatedRoute,
              private archivoService:ArchivoService,
              private router:Router){
  }



}
