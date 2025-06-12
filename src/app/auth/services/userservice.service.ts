import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private _httpClient:HttpClient) { }
  onLogin(data:any):Observable<any> {
 return this._httpClient.post('https://dummyjson.com/auth/login',data);
  }
}
