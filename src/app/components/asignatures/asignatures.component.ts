import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { YesNoModalComponent } from '../yesNoModal/yesNoModal.component';
import { Subject } from 'src/app/domain/subject';
import { SubjectsService } from 'src/app/services/subjects.service';
import { NewAsignatureFormComponent } from './newAsignatureForm/newAsignatureForm.component';
@Component({
  selector: 'app-asignatures',
  templateUrl: './asignatures.component.html',
  styleUrls: ['./asignatures.component.css']
})
export class AsignaturesComponent implements OnInit {

  constructor(public dialog: MatDialog, private subjectService:SubjectsService) {
  }


  ngOnInit(): void {
    this.fetchAsignatures();
  }

  displayedColumns: string[] = ['name', 'edit', 'delete'];
  dataSource: MatTableDataSource<Subject>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  shouldDelete(id:string) {
    const dialogRef = this.dialog.open(YesNoModalComponent, {data:"Desea eliminar la materia?"})
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.deleteSubject(id)
      }
    })
  }

  async deleteSubject(id:string){
    try {
      this.dataSource=null
      await this.subjectService.deleteSubject(id)
      .then(()=>this.fetchAsignatures());
    } catch (error) {
      console.log(error);
    }
  }

  editSubject(id:String) {
    const dialogRef = this.dialog.open(NewAsignatureFormComponent, {
      data: id === "" ? "" : id
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.fetchAsignatures()
    })
  }

  async fetchAsignatures() {
    const response = await this.subjectService.getAllSubjects()
    this.dataSource = new MatTableDataSource<Subject>(response);
  }

  getStatus(subject: Subject) {
    return subject.active ? "activo" : "inactivo"
  }

}
