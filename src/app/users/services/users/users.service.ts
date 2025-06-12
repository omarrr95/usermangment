import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private _HttpClient:HttpClient) { }

  getAllUsers():Observable<any> {
    return this._HttpClient.get('https://dummyjson.com/users');
  }
  addUser(data: any): Observable<any> {
    return this._HttpClient.post('https://dummyjson.com/users/add', data);
  }
  editUser(data: any, id: number): Observable<any> {
    return this._HttpClient.put(`https://dummyjson.com/users/${id}`, data);
  }
  getUser(id:number): Observable<any> {
    return this._HttpClient.get(`https://dummyjson.com/users/${id}`);
  }
  deleteUser(id: number): Observable<any> {
    return this._HttpClient.delete(`https://dummyjson.com/users/${id}`);
  }
}
