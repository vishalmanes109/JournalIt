import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/service/entry.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor( private entryservice: EntryService) { }

  ngOnInit(): void {
  }

  send(){

  }

}
