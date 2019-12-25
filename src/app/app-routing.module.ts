import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path: '', component: StudentsListComponent, pathMatch: 'full' }, //recordar que en la ruta raiz hay que incorporar el pathmatch
  { path: 'new', component: NewStudentComponent },
  { path: 'edit/:identificador', component: EditComponent } //los : indican la parte variable, que van a ir diferentes datos
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
