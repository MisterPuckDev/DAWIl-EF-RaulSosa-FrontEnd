import { Injectable } from '@angular/core';
import {AppSettings} from "../../app.settings";
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../models/user.model";

const baseUrl = AppSettings.API_ENDPOINT + "/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  list():Observable<User[]>{
    return this.http.get<User[]>(baseUrl + "/list");
  }

  search(id: number | undefined): Observable<User> {
    return this.http.get<User>(`${baseUrl}/search/${id}`);
  }

  add(obj:User):Observable<any>{
    return this.http.post(baseUrl +"/add", obj);
  }

  update(obj:User):Observable<any>{
    return this.http.put(baseUrl +"/update", obj);
  }

  delete(id:number):Observable<any>{
    return this.http.delete(baseUrl + "/delete/"+ id);
  }

  generateDocumentExcel(id: number | undefined): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/vnd.ms-excel');
    let requestOptions: any = { headers: headers, responseType: 'blob' };
    return this.http.post(`${baseUrl}/reportXLSX/${id}`,'', requestOptions).pipe(map((response)=>{
      return {
        filename: 'ReporteUsuarios.xlsx',
        data: new Blob([response], {type: 'application/vnd.ms-excel'})
      };
    }));
  }

}
