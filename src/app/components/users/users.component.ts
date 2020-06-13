import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/domain/user';
import { MatDialog } from '@angular/material/dialog';
import { YesNoModalComponent } from '../yesNoModal/yesNoModal.component';
import { UserService } from '../../services/userService';
import { DataSource } from '@angular/cdk/table';
import { UserFormComponent } from './userForm/userForm.component';
import { isUndefined } from 'util';



// const ELEMENT_DATA: User[] = [
//   {id:"123", name: 'Javier',       <mat-cell *matCellDef="let element"> {{ element.lastname }} </mat-cell>
// : 'Gomez', password:"asejre", dni: 12344567, email: 'javiemgz@gmail.com', active: true },
//   {id:"123", name: 'Agustin', lastName: 'Tini', password:"asejre", dni: 12344567, email: 'agustini@gmail.com', active: true },
//   {id:"123", name: 'Nicolas', lastName: 'Chiozza', password:"asejre", dni: 12344567, email: 'niko@gmail.com', active: false },
//   {id:"123", name: 'Eugenio', lastName: 'Rossetto', password:"asejre", dni: 12344567, email: 'reuzal@gmail.com', active: true },
// ];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {

  constructor(public dialog: MatDialog, private userService: UserService) {
  }


  ngOnInit(): void {
    this.fetchUsers();
    //this.dataSource =  new MatTableDataSource<User>(ELEMENT_DATA);
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status', 'actions'];
  dataSource: MatTableDataSource<User>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  shouldDelete(id:string) {
    const dialogRef = this.dialog.open(YesNoModalComponent, { })
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.deleteUser(id)
        this.fetchUsers()
      }
    })
  }

  async deleteUser(id:string){
    await this.userService.deleteUser(id)
  }
  editUser(id:String) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: id === "" ? "" : id
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.fetchUsers()
    })
  }

  async fetchUsers() {
    const response = await this.userService.getUsers()
    this.dataSource = new MatTableDataSource<User>(response);
  }

  getStatus(user: User) {
    return user.active ? "activo" : "inactivo"
  }
}
