import { Component, Input, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Entry } from "../../models/Entry";
import { EntriesService } from "../../services/entries.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() entry: Entry;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalComponent>,
  private entryService: EntriesService
) { }

  ngOnInit() {
    this.entry = this.data;
  }

  //when user clicks the action button
  // The modal, show an alert and followed by the closing of the modal
  save() {
    // save new data
    this.entryService.editEntry(this.entry).subscribe(entry => {
      console.log(entry);
      if (entry.status === 'success') {
        this.entryService.fetchAllEntries();
      }
    })
    this.closeModal();
  }

  /*
   * If the user click s the cancel button
   */
  closeModal() {
    this.dialogRef.close();
  }
}
