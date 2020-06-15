import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { UsersComponent } from './components/users/users.component';
import { AsignaturesComponent } from './components/asignatures/asignatures.component';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ClassroomUsersComponent } from './components/classroomUsers/classroomUsers.component';


const routes: Routes = [
  { path: 'home', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'asignatures', component: AsignaturesComponent, canActivate: [AuthGuard] },
  { path: 'classrooms', component: ClassroomsComponent, canActivate: [AuthGuard]},
  { path: 'edit/classroom/:id', component: ClassroomUsersComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
