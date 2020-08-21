import { Injectable } from '@angular/core';
import {HttpClient ,HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import {Entry } from '../Entry';
import { DataserviceService } from './dataservice.service';


@Injectable({
  providedIn: "root",
})
export class EntryService {
  constructor(private http: HttpClient, private dataservice: DataserviceService) {}

  getEntries():Observable<Entry[]> {
    return this.http.get<Entry[]>(
      "https://journalit-server.herokuapp.com/entries"
    );
  }

  getEntry(id):Observable<any>{
    var header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    console.log("this is id lol:"+id);
    let url: string ="https://journalit-server.herokuapp.com/entry/"+id;
    console.log("this url:" + url);

    return this.http.get<any>(
      "https://journalit-server.herokuapp.com/entry/" + id, { headers: header }
      );

  }

// delete entry
  deleteEntry(entry){
    var header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.delete("https://journalit-server.herokuapp.com/entry/" + entry._id, { headers: header });
  }

  //
  delete(id){
    var header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.delete("https://journalit-server.herokuapp.com/entry/" + id, { headers: header });

  }
  // add entry
  addEntry(newEntry) {
    console.log(newEntry);
    var header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<Entry[]>('https://journalit-server.herokuapp.com/postentry', newEntry, { headers: header });

  } 

  // update entry
  updateEntry(body, date, title, id): Observable<Entry[]>{
    var entry={
      title:title,
      body:body,
      id:id,
      date:date
    }
    var header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.put<Entry[]>('https://journalit-server.herokuapp.com/updateentry/', entry, { headers: header });
  }

}
