import { Component } from '@angular/core';
import { Alumno } from 'src/app/models/alumno/alumno';
import { SignupService } from 'src/app/services/signup/signup.service';

@Component({
  selector: 'app-signup-alumno',
  templateUrl: './signup-alumno.component.html',
  styleUrls: ['./signup-alumno.component.css']
})
export class SignupAlumnoComponent {
  obAlumno:Alumno;

  constructor(private signupService:SignupService){
    this.obAlumno = new Alumno();
  }
  registrarAlumno(){
    this.signupService.registrarAlumno(this.obAlumno).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
