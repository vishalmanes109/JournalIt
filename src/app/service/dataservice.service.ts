import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  id:string;
  isLoggin:boolean;
  isUpdated:boolean;
  constructor() { }
}
