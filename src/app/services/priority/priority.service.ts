import { Injectable } from '@angular/core';
import {AppSettings} from "../../app.settings";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Priority} from "../../models/priority.model";

const baseUrl = AppSettings.API_ENDPOINT + "/priority";

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  constructor(private http:HttpClient) { }

  list():Observable<Priority[]>{
    return this.http.get<Priority[]>(baseUrl + "/list");
  }

}
