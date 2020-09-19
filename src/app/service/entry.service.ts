import { Injectable } from '@angular/core';
import {HttpClient ,HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import {Entry } from '../Entry';
import { DataserviceService } from './dataservice.service';


@Injectable({
  providedIn: "root",
})
export class EntryService {

  //private rootUrl ="https://journalit-server.herokuapp.com/api";
  private rootUrl ="https://localhost:3000/api";

  constructor(private http: HttpClient, private dataservice: DataserviceService) {}

  getEntries():Observable<any> {
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
    return this.http.post<any>(this.rootUrl +"/postentry", newEntry, { headers: header });

  } 

  // update entry
  updateEntry(updentry): Observable<any>{
    var header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.put<any>( this.rootUrl + "/updateentry/", updentry, {
      headers: header,
    });
  }
  deleteAll(){
    var username=localStorage.getItem('username');
    confirm("Do you want to delete all the entries Once deleted it will not recover" )
    var header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.delete<any>(this.rootUrl + "/deleteall/"+username, { headers: header });
  }
}
