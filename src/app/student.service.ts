import { Student } from './models/student.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    //this.baseUrl = 'http://aepi.ngrok.io/api/students'
    this.baseUrl = 'http://localhost:3000/api/students'
  }

  //si me devuelve un array, pongo un array, si me devolviera un objeto, pondria un objeto en lugar de un array
  getAll(): Promise<Student[]> {
    return this.http.get<Student[]>(this.baseUrl).toPromise();
    //desde el this-----baseUrl, me devolveria un observable, que podria acceder mediante subscribe()
    //pero queda mejor ponerlo como una promesa
  }

  //igual que el get, pero le decimos el objeto asociado (igual al que usamos en el postman, porque es el formato/valores que nodejs espera recibir)
  createNew(objetoValues): Promise<Student> {
    return this.http.post<Student>(this.baseUrl, objetoValues).toPromise();

  }

  delete(student): Promise<Student> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: {
        studentId: student._id
      }
    };
    return this.http.delete<Student>(this.baseUrl, httpOptions).toPromise();
  }


  //el metodo que recibe _studentId_ con el id studiente a editar y _valuesAEditar_ con los nuevos datos del estudiante
  update(studentId, valuesAEditar): Promise<Student> {
    //le paso el this.baseUrl, el servidor espera un objeto tipo Student con {studentId, nombre, apellidos...etc}
    valuesAEditar.studentId = studentId;
    return this.http.put<Student>(this.baseUrl, valuesAEditar).toPromise();
  }

  getById(studentId): Promise<Student> {
    //le agrego a la url que yo le pase el id para buscar de uno en uno
    return this.http.get<Student>(this.baseUrl + '/' + studentId).toPromise();
  }

}
