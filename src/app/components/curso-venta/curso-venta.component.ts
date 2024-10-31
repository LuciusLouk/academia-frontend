import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/models/curso/curso';
import { CursoService } from 'src/app/services/curso/curso.service';
import { MercadopagoService } from 'src/app/services/mercadopago/mercadopago.service';

@Component({
  selector: 'app-curso-venta',
  templateUrl: './curso-venta.component.html',
  styleUrls: ['./curso-venta.component.css']
})
export class CursoVentaComponent  implements OnInit {
  userId:number;
  cursoId: number;
  cursos:Array<Curso>;
  groupedCards: Curso[][] = [];
  obCurso:Curso;
  habilitadoCompra:boolean;


  constructor(private route: ActivatedRoute, 
              private cursoService:CursoService,
              private mercadoPagoService: MercadopagoService) {
    this.obCurso = new Curso();
    this.cursos = new Array();
    this.cursoId= 0;
    this.userId=0;
    this.habilitadoCompra = false;
    this.cargarCursos()
  }
 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cursoId = Number(params.get('id'));
      if(sessionStorage.getItem("userid")!=null){
        this.userId = Number(sessionStorage.getItem("userid"));
      }
      
      this.cargarCurso();
    });    
  }

  verificarPuedeComprar(){
    console.log("userid",this.userId);
    this.habilitadoCompra = false;
    this.cursoService.verificarPuedeComprar(this.cursoId).subscribe({
      next: (response:any) => {
        this.habilitadoCompra = response;
        console.log("puede comprar? ",this.habilitadoCompra);
      },
      error: (error: any) => console.error(error)
    });
  }

  /**
   * Crea el botón de pago
   */
  createPayment() {
    console.log("create payment of ",this.obCurso);
    this.mercadoPagoService.createPayment(this.obCurso.nombre.toString(),this.obCurso.modalidad.toString(), this.obCurso.precio, 1,this.userId,this.cursoId).subscribe(
      (preference:any) => {
        const mp = new (window as any).MercadoPago('APP_USR-ab91be51-3780-4d62-a1e4-3ebc339fa981', {
          locale: 'es-AR' // Cambia según el país
        });

        console.log(preference);
        // Renderiza el botón de pago
        mp.bricks().create("wallet", "wallet_container", {
          initialization: {
            preferenceId: preference.id // ID de la preferencia creada en el backend
          }
        });
      }
    );
  }
  chunkArray(array: Curso[], size: number): Curso[][] {
    const result: Curso[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  cargarCursos(): void{
    this.cursoService.obtenerCursosActivos().subscribe(
      result => {
        console.log(result);
        this.cursos = result;this.groupedCards = this.chunkArray(this.cursos, 3);
        
      },error => console.log("no se pudieron cargar los cursos")
    )
  }

  cargarCurso(){
    this.verificarPuedeComprar();
    this.cursoService.obtenerCursoVenta(this.cursoId).subscribe(
      (response:any)=>{
        console.log("Response cargarCurso",response);
        Object.assign(this.obCurso,response);
        //this.cargarArchivo();

        
          //this.cursoService.cargarArchivo(this.curso);
        console.log("Curso cargado ",this.obCurso);
        this.createPayment();
      }
    )
  }


}
