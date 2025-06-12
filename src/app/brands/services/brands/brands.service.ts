import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient:HttpClient) { }

  getAllBrands():Observable<any> {
    return this._HttpClient.get('http://ecommerce-api.omar-work.website/api/Brands');
  }
  addBrand(data: { name: string; img: string }): Observable<any> {
    return this._HttpClient.post('http://ecommerce-api.omar-work.website/api/Brands', data);
  }
  editBrand(data: { name: string; img: string }, id: number): Observable<any> {
    return this._HttpClient.post(`http://ecommerce-api.omar-work.website/api/Brands/${id}`, data);
  }
  getBrand(id:number): Observable<any> {
    return this._HttpClient.get(`http://ecommerce-api.omar-work.website/api/Brands/${id}`);
  }
  deleteBrand(id: number): Observable<any> {
    return this._HttpClient.delete(`http://ecommerce-api.omar-work.website/api/Brands/${id}`);
  }
}
