import { Component } from '@angular/core';
import { Docente } from 'src/app/models/docente/docente';
import { SignupService } from 'src/app/services/signup/signup.service';

@Component({
  selector: 'app-signup-docente',
  templateUrl: './signup-docente.component.html',
  styleUrls: ['./signup-docente.component.css']
})
export class SignupDocenteComponent {
  obDocente:Docente;

  constructor(private signupService:SignupService) {
    this.obDocente = new Docente();
  }

  registrarDocente():void {
    console.log(this.obDocente);
    this.signupService.registrarDocente(this.obDocente).subscribe(
      (response:any)=>{
        console.log(response);
      }
    )
  }
}
