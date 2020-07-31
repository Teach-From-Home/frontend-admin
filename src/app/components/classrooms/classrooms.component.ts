import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { YesNoModalComponent } from '../yesNoModal/yesNoModal.component';
import { Subject } from 'src/app/domain/subject';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ClassroomFormComponent } from './classroomForm/classroomForm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css'],
})
export class ClassroomsComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private classromService: ClassroomService,
    private snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {
    this.fetchAsignatures();
  }

  displayedColumns: string[] = [
    'subject',
    'name',
    'edit Classroom',
    'edit Users',
    'Delete',
    'Restart',
  ];
  dataSource: MatTableDataSource<Subject>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  shouldDelete(id: string) {
    const dialogRef = this.dialog.open(YesNoModalComponent, {
      data: 'Desea eliminar el classroom?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSubject(id);
        this.fetchAsignatures();
      }
    });
  }

  error(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 2000,
    });
  }

  async deleteSubject(id: string) {
    try {
      this.dataSource = null;
      await this.classromService
        .deleteClassroom(id)
        .then(() => this.fetchAsignatures());
    } catch (error) {
      console.log(error);
    }
  }

  editSubject(id: String) {
    const dialogRef = this.dialog.open(ClassroomFormComponent, {
      data: id === '' ? '' : id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource = null;
        setTimeout(() => {
          this.fetchAsignatures();
        }, 600);
      }
    });
    return;
  }

  async fetchAsignatures() {
    const response = await this.classromService.getClassrooms();
    this.dataSource = new MatTableDataSource<Subject>(response);
  }

  getStatus(subject: Subject) {
    return subject.active ? 'activo' : 'inactivo';
  }

  async restartClassroom(id: string) {
    try {
      await this.classromService.restartClassroom(id);
      this.error('Classroom reiniciado con exito!')
    } catch (error) {
      console.log(error);
    }
  }

  wantRestart(id: string) {
    const dialogRef = this.dialog.open(YesNoModalComponent, {
      data: 'Desea reiniciar el classroom?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.restartClassroom(id);
        this.fetchAsignatures();
      }
    });
  }
}
