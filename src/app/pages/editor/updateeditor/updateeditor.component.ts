import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { EntryService } from '../../../service/entry.service';
import { Entry } from '../../../Entry';
import { DataserviceService } from '../../../service/dataservice.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-updateeditor',
  templateUrl: './updateeditor.component.html',
  styleUrls: ['./updateeditor.component.css']
})
export class UpdateeditorComponent implements OnInit {

  public text: any = "";
  entry_title: string;
  entry_body: string;
  entry_date: Date;
  public entries: Entry[];

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
      "Image",
      "|",
      "|",
      "FullScreen",
    ],
  };

  public title_box: object = {
    items: [
    ],
  };

  constructor(
    private sanitizer: DomSanitizer,
    private entryservice: EntryService, 
    private dataservice: DataserviceService,
    private router: Router) { 

    if (this.id == undefined) {
      router.navigate(['/journal']);
    }
    }

  ngOnInit(): void { }
  @ViewChild("fromRTE", { static: false })
  private rteEle: RichTextEditorComponent;
  public title: string =" ";
  public value: string ='';
  public id:string=this.dataservice.id;
  

entry=Entry
  rteCreated(): void {
    this.rteEle.element.focus();
    this.entryservice.getEntry(this.id).subscribe((entries) => {
      this.value=entries.body;
      this.title=entries.title;
      this.date=entries.date;
     this.text = this.sanitizer.bypassSecurityTrustHtml(entries.body);
    });

  }
  onSubmit(form: NgForm): void {
   //this.text = this.sanitizer.bypassSecurityTrustHtml(form.value.name);
    this.value = "";
    let todays_date = new Date();
     //this.dataservice.isUpdated=true;
     let title = form.value.title;
     let  body = form.value.name;
     let  date = todays_date.toISOString().slice(0, 10);
     
     var entry={
       title:title,
       id: this.dataservice.id,
       date:date,
       body:body
     };

    this.entryservice.updateEntry(body, date, title, this.dataservice.id).subscribe(entry => {
      form.value.title = " ";
     this.entryservice.delete(this.dataservice.id).subscribe(f =>{
           this.router.navigate(['/journal']);
          });

    });

  }

  // add entry
  date: Date;

  addEntry(event) {
    let date = new Date();
    var newEntry = {
      title: this.entry_title,
      body: this.entry_body,
      date: date.toISOString().slice(0, 10)
    }

    this.entryservice.addEntry(newEntry).subscribe(entry => {
      this.entry_title = '';
      this.entry_body = '';
    });

    this.entryservice.getEntries().subscribe((entries) => {
      this.entries = entries;
    });
  }
}
