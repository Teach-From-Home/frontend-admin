import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './components/landing/landing.component';
import { MaterialModule } from './material.module';
import { UsersComponent } from './components/users/users.component';
import { YesNoModalComponent } from './components/yesNoModal/yesNoModal.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './components/users/userForm/userForm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { SubjectsComponent } from './components/users/subjects/subjects.component';
import { AsignaturesComponent } from './components/asignatures/asignatures.component';
import { NewAsignatureFormComponent } from './components/asignatures/newAsignatureForm/newAsignatureForm.component';
import { SubjectsService } from './services/subjects.service';
import { SessionService } from './services/session.service';
import { LoginComponent } from './components/login/login.component';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { ClassroomFormComponent } from './components/classrooms/classroomForm/classroomForm.component';
import { SingleSubjectSelectorComponent } from './components/classrooms/singleSubjectSelector/singleSubjectSelector.component';
import { ClassroomUsersComponent } from './components/classroomUsers/classroomUsers.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    UsersComponent,
    YesNoModalComponent,
    UserFormComponent,
    SubjectsComponent,
    AsignaturesComponent,
    NewAsignatureFormComponent,
    LoginComponent,
    ClassroomsComponent,
    ClassroomFormComponent,
    SingleSubjectSelectorComponent,
    ClassroomUsersComponent,
  ],

  entryComponents: [
    YesNoModalComponent,
    UserFormComponent,
    NewAsignatureFormComponent,
    ClassroomFormComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [UserService, SubjectsService,SessionService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
