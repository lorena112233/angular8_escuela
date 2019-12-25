import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../models/student.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  formulario: FormGroup
  estudiante: Student
  identificador: string

  //meto en el constructor el activated route para trabajar con la url
  //me devuelve un observable, por lo que tengo que subscribe()
  constructor(private activatedRoute: ActivatedRoute, 
  private studentService: StudentService,
  private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.identificador = params.identificador;
      console.log(params.identificador);
      this.studentService.getById(params.identificador).then(response => {
        console.log(response)
        this.estudiante=response;
         // Generamos el formulario a partir de los datos del estudiante
         this.formulario = new FormGroup({
          nombre: new FormControl(this.estudiante.nombre),
          apellidos: new FormControl(this.estudiante.apellidos),
          edad: new FormControl(this.estudiante.edad),
          dni: new FormControl(this.estudiante.dni),
          activo: new FormControl(this.estudiante.activo)
        })
      })
    })
  }

  enviarFormulario(values){
    console.log(values);
    this.studentService.update(this.identificador,this.formulario.value).then(response => {
      this.router.navigate(['/']);
    })
  }

}
