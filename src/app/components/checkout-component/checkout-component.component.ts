import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/services/curso/curso.service';
import { MercadopagoService } from 'src/app/services/mercadopago/mercadopago.service';

@Component({
  selector: 'app-checkout-component',
  templateUrl: './checkout-component.component.html',
  styleUrls: ['./checkout-component.component.css']
})
export class CheckoutComponentComponent implements OnInit {
  userId:number;
  cursoId: number;
  constructor(private route: ActivatedRoute, private paymentService: MercadopagoService,private alumnoService:CursoService) {
    this.cursoId=0;
    this.userId=0;
   }

  ngOnInit(): void {
    //this.createPayment();
    
    this.route.paramMap.subscribe(params => {
      this.cursoId = Number(params.get('id'));

      if(sessionStorage.getItem("userid")!=null){
        this.userId = Number(sessionStorage.getItem("userid"));
      }
    });
    
    console.log(this.userId,this.cursoId);
    this.registroAlumnoCurso();
    /*
    const preferenceId = 'YOUR_PREFERENCE_ID'; // Aquí usar la preferencia que del servidor de mercado pago
    this.mercadoPagoService.createBrick('wallet_container', preferenceId);

    */
    //Crea el boton de pago
    
  }
  


  registroAlumnoCurso(){
    this.alumnoService.registrarAlumnoCurso(this.userId,this.cursoId).subscribe(
      result=>{
        console.log(result);
      }
    )
  }



/*
  createPayment() {
    this.paymentService.createPayment("pelota", "una pelota", 10, 1).subscribe(
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
  }*/
}
