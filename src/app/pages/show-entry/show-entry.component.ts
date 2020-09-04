import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { EntryService } from '../../service/entry.service';
import { Entry } from '../../Entry';
import { DataserviceService } from '../../service/dataservice.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-show-entry',
  templateUrl: './show-entry.component.html',
  styleUrls: ['./show-entry.component.css']
})
export class ShowEntryComponent implements OnInit {
  public id: string = this.dataservice.id;
  //public id: string = "5f3fe656801a820017c899c8";
  public body:any;
  public title:string;
  public date:Date;
  public lastupdatetime:Date;
  
  constructor(private sanitizer: DomSanitizer,
    private entryservice: EntryService,
    private dataservice: DataserviceService,
    private router: Router) {

      if(this.id==undefined){
        router.navigate(['/journal']);
      }

    this.entryservice.getEntry(this.id).subscribe((entries) => {
      this.title = entries.title;
      this.date = entries.date;
      this.body = this.sanitizer.bypassSecurityTrustHtml(entries.body);
      this.lastupdatetime = entries.lastUpdateTime;

       });
    }
  
  ngOnInit(): void {
  }

  update(){
    this.dataservice.id=this.id;
  }
  

}
