import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/domain/user';
import { MatDialog } from '@angular/material/dialog';
import { YesNoModalComponent } from '../yesNoModal/yesNoModal.component';
import { UserService } from '../../services/user.service';
import { UserFormComponent } from './userForm/userForm.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {

  constructor(public dialog: MatDialog, private userService: UserService) {
  }
  displayedColumns: string[] = ['name', 'lastname', 'dni', 'email', 'status', 'edit', 'delete'];
  dataSource: MatTableDataSource<User>;

  ngOnInit(): void {
    this.fetchUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  shouldDelete(id: string) {
    const dialogRef = this.dialog.open(YesNoModalComponent, {})
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(id)
        this.fetchUsers()
      }
    })
  }

  async deleteUser(id: string) {
    try {
      await this.userService.deleteUser(id);
      this.fetchUsers()
    } catch (error) {
      console.log(error);
    }
  }
  editUser(id: String) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: id === "" ? "" : id
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.fetchUsers()
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
