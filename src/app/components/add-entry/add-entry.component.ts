import { Component, OnInit } from '@angular/core';
import { Entry } from "../../models/Entry";
import { EntriesService } from "../../services/entries.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {
  entry: Entry = {
    title: '',
    description: '',
  };

  constructor(private entriesService: EntriesService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.entriesService.addEntry(this.entry).subscribe(entry => {
      if (entry.status === "success"){
        this.router.navigate(['/dashboard']);
      }
    })
  }

}
