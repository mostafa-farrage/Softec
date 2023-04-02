import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Injectable()
export class OrderService {
  controller: string = "orders.json";
  constructor(private _apiService: ApiService) { }
  
  getOrders() {
    return this._apiService.get(`${this.controller}`);
  } 
  getUsers() {
    return this._apiService.get(`users.json`);
  } 
}
