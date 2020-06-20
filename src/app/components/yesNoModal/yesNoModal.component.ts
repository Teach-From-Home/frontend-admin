import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-yesNoModal',
  templateUrl: './yesNoModal.component.html',
  styleUrls: ['./yesNoModal.component.css']
})
export class YesNoModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<YesNoModalComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

}
