import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { YesNoModalComponent } from '../yesNoModal/yesNoModal.component';
import { Subject } from 'src/app/domain/subject';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ClassroomFormComponent } from './classroomForm/classroomForm.component';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css']
})
export class ClassroomsComponent implements OnInit {

  constructor(public dialog: MatDialog, private classromService: ClassroomService) {
  }


  ngOnInit(): void {
    this.fetchAsignatures();
  }

  displayedColumns: string[] = ['subject', 'name', 'actions'];
  dataSource: MatTableDataSource<Subject>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  shouldDelete(id: string) {
    const dialogRef = this.dialog.open(YesNoModalComponent, {})
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSubject(id)
        this.fetchAsignatures()
      }
    })
  }

  async deleteSubject(id: string) {
    try {
      await this.classromService.deleteClassroom(id);
      this.fetchAsignatures()
    } catch (error) {
      console.log(error);
    }
  }

  editSubject(id: String) {
    const dialogRef = this.dialog.open(ClassroomFormComponent, {
      data: id === "" ? "" : id
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = null
        setTimeout(() => {
          this.fetchAsignatures()
        }, 600)
      }
    })
    return
  }

  async fetchAsignatures() {
    const response = await this.classromService.getClassrooms()
    this.dataSource = new MatTableDataSource<Subject>(response);
  }

  getStatus(subject: Subject) {
    return subject.active ? "activo" : "inactivo"
  }

}
