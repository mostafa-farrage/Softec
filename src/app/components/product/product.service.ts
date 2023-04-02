import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  controller: string = "porducts.json";
  constructor(private _apiService: ApiService) { }
  
  getProducts() {
    return this._apiService.get(`${this.controller}`);
  } 
}
