import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-yesNoModal',
  templateUrl: './yesNoModal.component.html',
  styleUrls: ['./yesNoModal.component.css']
})
export class YesNoModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<YesNoModalComponent>) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

}
