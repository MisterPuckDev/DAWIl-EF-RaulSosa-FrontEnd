import { Injectable } from '@angular/core';
import {AppSettings} from "../../app.settings";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Kind} from "../../models/kind.model";

const baseUrl = AppSettings.API_ENDPOINT + "/kind";

@Injectable({
  providedIn: 'root'
})
export class KindService {

  constructor(private http:HttpClient) { }

  list():Observable<Kind[]>{
    return this.http.get<Kind[]>(baseUrl + "/list");
  }

}
