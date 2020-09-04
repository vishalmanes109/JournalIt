import { Injectable } from '@angular/core';
import {HttpClient ,HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import {Entry } from '../Entry';
import { DataserviceService } from './dataservice.service';


@Injectable({
  providedIn: "root",
})
export class EntryService {

  private rootUrl ="https://journalit-server.herokuapp.com/api";

  constructor(private http: HttpClient, private dataservice: DataserviceService) {}

  getEntries():Observable<Entry[]> {
    let user=localStorage.getItem('username');
    return this.http.get<Entry[]>(
      this.rootUrl+"/entries/"+user);
  }

  getSortedEntries():Observable<any>{
    let user = localStorage.getItem('username');
    return this.http.get<Entry[]>(
      this.rootUrl + "/sorted_entries/" + user);
  }

  getEntry(id):Observable<any>{
    var header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    let url: string =this.rootUrl+"/entry/"+id;
    let username=localStorage.getItem('username');
    return this.http.get<any>(
      this.rootUrl +"/entry/" + id, { headers: header }
      );

  }

// delete entry
  deleteEntry(entry){
    var header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.delete(this.rootUrl +"/entry/" + entry._id, { headers: header });
  }

  //
  delete(id){
    var header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.delete(this.rootUrl +"/entry/" + id, { headers: header });

  }
  // add entry
  addEntry(newEntry) {
    var header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<Entry[]>(this.rootUrl +"/postentry", newEntry, { headers: header });

  } 

  // update entry
  updateEntry(body, date, title, id,username,lastupdatetime): Observable<Entry[]>{
    var entry={
      title:title,
      body:body,
      id:id,
      date:date,
      username:username,
      lastUpdateTime:lastupdatetime
    }
    var header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.put<Entry[]>(this.rootUrl +"/updateentry/", entry, { headers: header });
  }

}
