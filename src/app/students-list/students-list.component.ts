import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  arrayStudents: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.recuperarEstudiantes()
  }

  //la peticion para borrar tiene que estar en el servicio
  eliminarStudent(student) {
    this.studentService.delete(student).then(response => {
      console.log(response)
      this.recuperarEstudiantes()

    })
  }

  recuperarEstudiantes(){
    //this.studentService.getAll() //esto devuelve una Promse, tengo que tratarla
    this.studentService.getAll().then(response => {
      console.log(response); //veo que me devuelve un array, por eso lo pongo:
      this.arrayStudents = response;
    })
  }

}
