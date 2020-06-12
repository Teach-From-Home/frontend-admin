import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { UsersComponent } from './components/users/users.component';
import { AsignaturesComponent } from './components/asignatures/asignatures.component';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';


const routes: Routes = [
  { path: 'home', component: LandingComponent},
  { path: 'users', component: UsersComponent},
  { path: 'asignatures', component: AsignaturesComponent},
  { path: 'classrooms', component: ClassroomsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
