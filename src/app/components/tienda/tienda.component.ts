import { Component } from '@angular/core';
import { Curso } from 'src/app/models/curso/curso';
import { CursoService } from 'src/app/services/curso/curso.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  cursos:Array<Curso>;
  groupedCards: Curso[][] = [];
  constructor(private cursoService:CursoService,

   ){
    this.cursos = new Array();
    this.cargarCursos()
  }

  ngOnInit(): void {
    this.cargarCursos();
  }


  cargarCursos(): void{
    this.cursoService.obtenerCursosActivos().subscribe(
      result => {
        console.log("result ",result);
        this.cursos = result;
        
        this.groupedCards = this.chunkArray(this.cursos, 3);
        
      },error => console.log("no se pudieron cargar los cursos")
    )
  }

  chunkArray(array: Curso[], size: number): Curso[][] {
    const result: Curso[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
 
}
