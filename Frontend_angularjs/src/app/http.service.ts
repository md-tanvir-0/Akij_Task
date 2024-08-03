import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProduct } from './interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = 'https://localhost:7080';
  http = inject(HttpClient);

  constructor() {}

  getAllProduct() {
    return this.http.get<IProduct[]>(`${this.apiUrl}/api/Product`);
  }

  createProduct(product: IProduct) {
    return this.http.post(`${this.apiUrl}/api/Product`, product);
  }

  getProduct(productId: number) {
    return this.http.get<IProduct>(`${this.apiUrl}/api/Product/${productId}`);
  }

  updateProduct(productId: number, product: IProduct) {
    return this.http.put<IProduct>(`${this.apiUrl}/api/Product/${productId}`, product);
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.apiUrl}/api/Product/${productId}`);
  }
}
