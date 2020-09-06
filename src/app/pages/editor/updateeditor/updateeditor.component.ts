import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { EntryService } from '../../../service/entry.service';
import { Entry } from '../../../Entry';
import { DataserviceService } from '../../../service/dataservice.service';
import { RouterModule, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-updateeditor",
  templateUrl: "./updateeditor.component.html",
  styleUrls: ["./updateeditor.component.css"],
})
export class UpdateeditorComponent implements OnInit {
  public text: any = "";
  entry_title: string;
  entry_body: string;
  entry_date: Date;
  public entries: Entry[];
  private key: string;
  showentry: Entry;
  body: any = "";
  loading:boolean;

  public tools: object = {
    items: [
      "Bold",
      "Italic",
      "Underline",
      "StrikeThrough",
      "|",
      "FontName",
      "FontSize",
      "FontColor",
      "BackgroundColor",
      "|",
      "LowerCase",
      "UpperCase",
      "|",
      "Formats",
      "Alignments",
      "|",
      "OrderedList",
      "UnorderedList",
      "|",
      "Indent",
      "Outdent",
      "|",
      "CreateLink",
      "CreateTable",
      "|",
      "|",
      "FullScreen",
    ],
  };

  public title_box: object = {
    items: [],
  };

  constructor(
    private sanitizer: DomSanitizer,
    private entryservice: EntryService,
    private dataservice: DataserviceService,
    private router: Router
  ) {
    if (this.id == undefined) {
      router.navigate(["/journal"]);
    }
  }

  ngOnInit(): void {


  }
  @ViewChild("fromRTE", { static: false })
  private rteEle: RichTextEditorComponent;
  public title: string = " ";
  public value: string = "";
  public id: string = this.dataservice.id;
  public lastupdatetime: Date;

  entry = Entry;
  
  rteCreated(): void {
    this.rteEle.element.focus();

    this.entryservice.getEntry(this.id).subscribe(
      (res) => {
        this.key = localStorage.getItem("token").trim();

        this.showentry = JSON.parse(
          CryptoJS.AES.decrypt(res.encdata, this.key).toString(
            CryptoJS.enc.Utf8
          )
        );
        this.showentry._id = res._id;

        //console.log(this.showentry.body);
        this.value = this.showentry.body;
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
  onSubmit(form: NgForm): void {
    this.text = this.sanitizer.bypassSecurityTrustHtml(form.value.name);
    this.value = "";
    let date = new Date();
    this.key = localStorage.getItem("token");

    var newEntry = {
      title: form.value.title,
      body: form.value.body,
      date: this.showentry.date,
      lastUpdateTime: date,
    };
    var encEntry = CryptoJS.AES.encrypt(
      JSON.stringify(newEntry),
      localStorage.getItem("token")
    ).toString();

    //console.log('from udp:'+encEntry);

    var updEntry = {
      id:this.showentry._id,
      encdata: encEntry,
      username: localStorage.getItem("username"),
      date:this.showentry.date
    };
    console.log('from upd:'+updEntry);

    this.entryservice.updateEntry(updEntry).subscribe((entry) => {
      form.value.title = " ";
      this.router.navigate(['/journal']);
    });
  }

  // add entry
  date: Date;

  addEntry(event) {
    let date = new Date();
    var newEntry = {
      title: this.entry_title,
      body: this.entry_body,
      date: date.toISOString().slice(0, 10),
    };

    this.entryservice.addEntry(newEntry).subscribe((entry) => {
      this.entry_title = "";
      this.entry_body = "";
    });

    this.entryservice.getEntries().subscribe((entries) => {
      this.entries = entries;
    });
  }
}


// update 
