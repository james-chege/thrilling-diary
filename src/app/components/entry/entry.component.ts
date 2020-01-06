import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Entry } from "../../models/Entry";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ModalComponent } from "../../controls/modal/modal.component";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  @Input() entry: Entry;
  @Output() deleteEntry: EventEmitter<Entry> =  new EventEmitter();

  constructor(public matDialog: MatDialog) { }

  ngOnInit() {
  }

  onDelete(entry){
    this.deleteEntry.emit(entry);
  }

  openModal(entry) {
    console.log('opening modal ...');
    const dialogConfig = new MatDialogConfig();

    // the user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "400px";
    dialogConfig.width = "600px";
    dialogConfig.data = entry;

    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }


}
