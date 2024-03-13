import { Injectable } from '@angular/core';
import {AppSettings} from "../../app.settings";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../models/category.model";

const baseUrl = AppSettings.API_ENDPOINT + "/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  list():Observable<Category[]>{
    return this.http.get<Category[]>(baseUrl + "/list");
  }

}
