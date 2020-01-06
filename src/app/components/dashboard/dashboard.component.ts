import {Component, OnInit} from '@angular/core';
import { Entry } from "../../models/Entry";
import { EntriesService } from "../../services/entries.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  entries: Entry[];
  token: string;

  constructor(private entriesService: EntriesService, private router: ActivatedRoute, private route: Router) {
    this.setAuth();
  }

  setAuth(): void {
    this.router.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token){
        localStorage.setItem("access_token", this.token);
      }
    });
  }
  ngOnInit() {
    this.fetchEntries();
  }

  fetchEntries(): void {
    this.entriesService.fetchAllEntries().subscribe(entries => {
      // @ts-ignore
      this.entries = entries.Entries;
    }, error => {
      this.route.navigate(['/signin']);
    })
  }

  deleteEntry(entry){
    this.entriesService.deleteEntry(entry).subscribe(entry => {
      if (entry.status === 'success'){
        this.fetchEntries();
      }
    })
  }

}
