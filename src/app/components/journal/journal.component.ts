import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EntryService } from '../../service/entry.service';
import { Entry } from '../../Entry';
import { DataserviceService } from '../../service/dataservice.service';


@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
 
  entries:Entry[];
  
  constructor(private sanitizer: DomSanitizer,
    private entryservice: EntryService,
    private dataservice: DataserviceService) {
    
      this.entryservice.getEntries().subscribe((entries) => {
        this.entries = entries;
      });
      
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
  }

  showEntry(entry) {
    this.dataservice.id = entry._id;
  }
   

  ngOnInit(): void {
  }

}
