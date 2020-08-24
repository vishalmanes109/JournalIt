import { Component, OnInit, ViewChild, Pipe, PipeTransform  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { EntryService } from '../../../service/entry.service';
import { Entry } from '../../../Entry';
import { Observable } from 'rxjs';


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
      "FullScreen"
    ],
  };

  public title_box: object = {
    items: [
      "Bold",
      "Italic",
      "Underline",
      "|",
      "FontName",
      "FontColor",
      "|",
      "LowerCase",
      "UpperCase",
      "|",
      "FullScreen",
    ],
  };

  constructor(
    private sanitizer: DomSanitizer,
    private entryservice: EntryService
  ) {}

  ngOnInit(): void {}
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
    var newEntry = {
      title: form.value.title,
      body: form.value.name,
      date: date.toISOString().slice(0, 10)
    }
    
    this.entryservice.addEntry(newEntry).subscribe(entry => {
      form.value.title = " ";

    });
  }


  getEntries() {
    this.entryservice.getEntries().subscribe((entries) => {
      this.entries = entries;
    });
  }


  // add entry
 date:Date;
 
  addEntry(event){
    let date =new Date();
    var newEntry = {
      title: this.entry_title,
      body:this.entry_body,
      date: date.toISOString().slice(0, 10)
    }

    this.entryservice.addEntry(newEntry).subscribe(entry => {
      this.entry_title = '';
      this.entry_body ='';
    });

    this.entryservice.getEntries().subscribe((entries) => {
      this.entries = entries;
    });
  }

  // delete entry
  entry : Entry[];

  deleteEntry(entry){
    //this.entry = entry.filter(t => t.id != entry.id);
    this.entryservice.deleteEntry(entry).subscribe();
    this.entryservice.getEntries().subscribe((entries) => {
      this.entries = entries;
    });

  }

  // update entry

  
}





