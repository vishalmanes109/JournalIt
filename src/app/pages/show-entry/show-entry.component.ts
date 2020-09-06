import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { EntryService } from '../../service/entry.service';
import { Entry } from '../../Entry';
import { DataserviceService } from '../../service/dataservice.service';
import { RouterModule, Router } from '@angular/router';
import * as CryptoJS from "crypto-js";
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: "app-show-entry",
  templateUrl: "./show-entry.component.html",
  styleUrls: ["./show-entry.component.css"],
})
export class ShowEntryComponent implements OnInit {
  public id: string = this.dataservice.id;
  //public id: string = "5f3fe656801a820017c899c8";
  public body: any;
  public title: string;
  public date: Date;
  public lastupdatetime: Date;
  private key: string;

  showentry: Entry;
  loading:boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private entryservice: EntryService,
    private dataservice: DataserviceService,
    private router: Router
  ) {
    if (this.id == undefined) {
      console.log("id:undef");
      router.navigate(["/journal"]);
    }
  }

  ngOnInit(): void {
    this.loading=true;
    this.entryservice.getEntry(this.id).subscribe(
      (res) => {
        this.key = localStorage.getItem("token").trim();
        

        this.showentry = JSON.parse(
          CryptoJS.AES.decrypt(res.encdata, this.key).toString(
            CryptoJS.enc.Utf8
          )
        );
        this.showentry._id = res._id;

        this.title = this.showentry.title;
        this.date = this.showentry.date;
        this.body = this.sanitizer.bypassSecurityTrustHtml(this.showentry.body);
        this.lastupdatetime = this.showentry.lastUpdateTime;
        this.loading = false;    

        /*  if (this.entries.length == 0) {
          this.isNoEntry = true;
        }*/
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

  update() {
    this.dataservice.id = this.id;
  }
}
