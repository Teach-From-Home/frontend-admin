import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/domain/user';
import { MatDialog } from '@angular/material/dialog';
import { YesNoModalComponent } from '../yesNoModal/yesNoModal.component';
import { UserService } from '../../services/userService';
import { DataSource } from '@angular/cdk/table';
import { UserFormComponent } from './userForm/userForm.component';



const ELEMENT_DATA: User[] = [
  { name: 'Javier', lastName: 'Gomez', dni: 12344567, email: 'javiemgz@gmail.com', active: true },
  { name: 'Agustin', lastName: 'Tini', dni: 12344567, email: 'agustini@gmail.com', active: true },
  { name: 'Nicolas', lastName: 'Chiozza', dni: 12344567, email: 'niko@gmail.com', active: false },
  { name: 'Eugenio', lastName: 'Rossetto', dni: 12344567, email: 'reuzal@gmail.com', active: true },
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {

  constructor(public dialog: MatDialog, private userService: UserService) {
  }

  usuarios: User[];

  ngOnInit(): void {
    //this.fetchUsers();
    this.dataSource =  new MatTableDataSource<User>(ELEMENT_DATA);
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status', 'actions'];
  dataSource: MatTableDataSource<User>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  shouldDelete() {
    const dialogRef = this.dialog.open(YesNoModalComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      alert(result)
    })
  }
  editUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      alert(result)
    })
  }

  async fetchUsers() {
    const response = await this.userService.getUsers()
    this.dataSource = new MatTableDataSource<User>(response);
  }

  getStatus(user:User){
    return user.active ? "activo" : "inactivo"
  }
}
