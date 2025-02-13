import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/domain/user';
import { MatDialog } from '@angular/material/dialog';
import { YesNoModalComponent } from '../yesNoModal/yesNoModal.component';
import { ClassroomService } from 'src/app/services/classroom.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-editListOfUsers',
  templateUrl: './editListOfUsers.component.html',
  styleUrls: ['./editListOfUsers.component.css']
})
export class EditListOfUsersComponent implements OnInit {

  constructor(public dialog: MatDialog, private classroomSerice: ClassroomService) {
  }
  @Input() type: string
  @Input() id: string
  @Input() deleteMode: boolean = true
  @Input() users: User[]
  size: number
  @Output() delete = new EventEmitter<string>();


  displayedColumns: string[] = ['name', 'dni', 'actions'];
  dataSource: MatTableDataSource<User>;

  ngOnInit(): void {
    this.fetchData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteUser(user: User) {
    this.emitAdd(user.id)
  }

  async addUser(user: User) {
    this.dataSource = null
    this.classroomSerice.addUser(this.id, user.id)
    .then(()=>this.fetchData())
  }

  fetchData() {
    if (!isUndefined(this.users)) {
      this.size = this.users.length
      this.dataSource = new MatTableDataSource<User>(this.users);
    }
    else {
      this.type === "TEACHER" ?
        this.fetchNotTeachers() :
        this.fetchNotStudents()
    }
  }

  async fetchNotTeachers() {
    const response = await this.classroomSerice.notAddedTeachers(this.id)
    this.size = response.length
    this.dataSource = new MatTableDataSource<User>(response);
  }

  async fetchNotStudents() {
    const response = await this.classroomSerice.notAddedStudents(this.id)
    this.size = response.length
    this.dataSource = new MatTableDataSource<User>(response);
  }

  emitAdd(id: string) {
    this.delete.emit(id);
  }

  hasData() {
    return this.size >= 1
  }
}
