import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {

  formulario: FormGroup;
  errores: any;

  constructor(private studentService: StudentService, private router: Router) {

    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      dni: new FormControl(''),
      edad: new FormControl(''),
      activo: new FormControl(''),
    }); 


  }

  ngOnInit() {
  }

  //lo unico diferente del getAll es que aqui le pasamos un parametro. por lo demas son igual. Les pasamos una promesa
  async envioFormulario(){
    console.log(this.formulario.value);
    console.log("------")
    try{
      let response = await this.studentService.createNew(this.formulario.value);
      console.log(response)
      this.router.navigate(['/']);

    } catch(err){
      console.log(err.error[0].msg)
      this.errores = err.error;
    }
    // this.studentService.createNew(this.formulario.value) //devuelve una promesa, por lo que pongo abajo await y lo almaceno en otra variable,  y en la funcion arriba  async,
  }
  

  hayError(control): string {
    let error = this.errores.find(item => item.param === control)
    if (error) {
      return error.msg
    } else {
      return "";
    }
  }

}
