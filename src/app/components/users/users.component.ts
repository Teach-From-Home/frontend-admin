import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/domain/user';
import { MatDialog } from '@angular/material/dialog';
import { YesNoModalComponent } from '../yesNoModal/yesNoModal.component';



const ELEMENT_DATA: User[] = [
  { name: 'Javier', lastName: 'Gomez', dni: 12344567, email: 'javiemgz@gmail.com' },
  { name: 'Agustin', lastName: 'Tini', dni: 12344567, email: 'agustini@gmail.com' },
  { name: 'Nicolas', lastName: 'Chiozza', dni: 12344567, email: 'niko@gmail.com' },
  { name: 'Eugenio', lastName: 'Rossetto', dni: 12344567, email: 'reuzal@gmail.com' },
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor( public dialog: MatDialog ) {

  }
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

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
}
