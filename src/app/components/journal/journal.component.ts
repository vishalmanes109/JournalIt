import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EntryService } from '../../service/entry.service';
import { Entry } from '../../Entry';
import { DataserviceService } from '../../service/dataservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { stringify } from 'querystring';


@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
 
  entries:Entry[];
  username:string;
  isNoEntry=false;
  isoldselected:boolean;
  constructor(private sanitizer: DomSanitizer,
    private entryservice: EntryService,
    private dataservice: DataserviceService,
    private router: Router) {
    
    }

    // sort entries by date 
  SortDate(){
        // getting entries sorted by old entry 
    this.isoldselected=true;
    this.username = localStorage.getItem('username');
    this.entryservice.getEntries().subscribe(
      res => {
        this.entries = res
        if (this.entries.length == 0) {
          this.isNoEntry = true;
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 500) {
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }
    // delete entry
  deleteEntry(entry) {
    this.entryservice.deleteEntry(entry).subscribe();
    this.entryservice.getEntries().subscribe((entries) => {
      this.entries = entries;
    });

  }

  updateEntry(entry){
    this.dataservice.id=entry._id;
    this.dataservice.isUpdated=false;
  }

  showEntry(entry) {
    this.dataservice.id = entry._id;
  }
   

  ngOnInit(): void {
    // getting entries sorted by new entry 
    this.isoldselected=false;
    this.username = localStorage.getItem('username');
    this.entryservice.getSortedEntries().subscribe(
      res => {
        this.entries = res
        if (this.entries.length == 0) {
          this.isNoEntry = true;
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 500) {
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }

}



