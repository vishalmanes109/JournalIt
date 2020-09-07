import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EntryService } from '../../service/entry.service';
import { Entry } from '../../Entry';
import { DataserviceService } from '../../service/dataservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router,NavigationEnd } from '@angular/router';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: "app-journal",
  templateUrl: "./journal.component.html",
  styleUrls: ["./journal.component.css"],
})
export class JournalComponent implements OnInit {
  entries: any[] = [];
  username: string;
  isNoEntry = false;
  isoldselected: boolean;
  name: string;
  entry_title: string;
  entry_body: string;
  private key: string;
  mySubscription: any;
  loading:boolean;

  constructor(
    
    private entryservice: EntryService,
    private dataservice: DataserviceService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  // sort entries by date // new first
  SortDate() {
    // getting entries sorted by old entry
    this.isoldselected = true;
    this.username = localStorage.getItem("username");
    this.key = this.username;
    this.entryservice.getEntries().subscribe(
      (res) => {
        if(res.length==0){
          this.isNoEntry = true;
          this.loading = false;
        }
        else{
          for (var i = 0; i < res.length; i++) {
            this.entries[i] = JSON.parse(CryptoJS.AES.decrypt(res[i].encdata, this.key).toString(CryptoJS.enc.Utf8)
            );
            this.entries[i]._id = res[i]._id;
          }
          this.loading=false;
        }
       
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 500) {
            this.router.navigate(["/login"]);
          }
        }
      }
      
    );
  }
  
  deleteEntry(entry) {
   
    this.entryservice.deleteEntry(entry).subscribe();
    this.router.navigate(['/journal']);
  }

  updateEntry(entry) {
    this.dataservice.id = entry._id;
    this.dataservice.isUpdated = false;
  }

  showEntry(entry) {
    
    this.dataservice.id = entry._id;
  }
 
  DeleteAll(){
    this.entryservice.deleteAll().subscribe(()=>{
      this.router.navigate(['/journal']);
    });
    this.router.navigate(['/journal']);
  }

  ngOnInit(): void {
   
    this.loading=true;
    this.isoldselected = false;
    this.username = localStorage.getItem("username");
    this.key = this.username;
    this.entryservice.getSortedEntries().subscribe(
      (res) => {
        if (res.length == 0) {
          this.isNoEntry = true;
          this.loading = false;
        } else {
          for (var i = 0; i < res.length; i++) {
            this.entries[i] = JSON.parse(CryptoJS.AES.decrypt((res[i].encdata), this.key).toString(CryptoJS.enc.Utf8));
            this.entries[i]._id = res[i]._id;
          }
          this.loading=false;

        }
      },

      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 500) {
            this.router.navigate(["/login"]);
          }
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}



