import { Component, OnInit, ViewChild, Pipe, PipeTransform  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { EntryService } from '../../../service/entry.service';
import { Entry } from '../../../Entry';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: "app-editor-components",
  templateUrl: "./editor-components.component.html",
  styleUrls: ["./editor-components.component.css"],
})
export class EditorComponentsComponent implements OnInit {
  public text: any = "";
  entry_title: string;
  entry_body: string;
  entry_date: Date;
  setentry;
  public entries: Entry[];
  private key:string;
  username:string;

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
      "FullScreen"
    ],
  };

  constructor(
    private sanitizer: DomSanitizer,
    private entryservice: EntryService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.username=localStorage.getItem('username');
    this.entryservice.getEntries().subscribe(
      res => {
        this.entries = res
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
  

  @ViewChild("fromRTE", { static: false })
  private rteEle: RichTextEditorComponent;
  public value: string = null;
  public title: string = "";
  rteCreated(): void {
    this.rteEle.element.focus();
  }
  onSubmit(form: NgForm): void {
    this.text = this.sanitizer.bypassSecurityTrustHtml(form.value.name);
    this.value = "";
    let date = new Date();
    this.key=localStorage.getItem('token');

    var newEntry = {
      title: form.value.title,
      body: form.value.body,
      date: date.toISOString().slice(0, 10),
      lastUpdateTime: date
    }
    var encEntry=CryptoJS.AES.encrypt(
      JSON.stringify(newEntry),
      localStorage.getItem("token")
    ).toString();

    
    //console.log(encEntry);

    var addEntry = {
      encdata: encEntry,
      username: localStorage.getItem("username"),
      date: date
    };
  //  console.log(addEntry);
    this.entryservice.addEntry(addEntry).subscribe((entry) => {
      form.value.title = " ";
      this.router.navigate(["/journal"]);

    });
  }


  getEntries() {
    this.entryservice.getEntries().subscribe((entries) => {
      this.entries = entries;
    });
  }

/*
  // add entry
 date:Date;
 
  addEntry(event){
    let date =new Date();
    var newEntry = {
      title: this.entry_title,
      body:this.entry_body,
      date: date.toISOString().slice(0, 10),
      username:localStorage.getItem('username'),
      lastUpdateTime:date
    }

    this.entryservice.addEntry(newEntry).subscribe(entry => {
      this.entry_title = '';
      this.entry_body ='';
    });

    this.entryservice.getEntries().subscribe((entries) => {
      this.entries = entries;
    });
  }
*/

  // delete entry
  entry : Entry[];

  deleteEntry(entry){
    //this.entry = entry.filter(t => t.id != entry.id);
    this.entryservice.deleteEntry(entry).subscribe();
    this.entryservice.getEntries().subscribe((entries) => {
      this.entries = entries;
    });

  }

  
}





