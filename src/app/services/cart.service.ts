import { Injectable } from '@angular/core';
import { Cart } from '../model/cartModel';
// import { ProductInCart } from '../../model/productsinCart';
import {Product} from '../model/product'
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductsServiceService } from './products-service.service';
import { ProductInCart } from '../model/productsinCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart;
  private register: number;
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private productsService: ProductsServiceService) { }
  addProductToCart(userId: string, productId: string, quantity: number): Observable<any> {
    const payload: Cart = {
      userId: userId,
      products: [{
        productId: productId,
        quantity: quantity
      }],
      registro: Math.floor(Math.random() * (10000 - 12 + 1)) + 12
    };
    return this.http.post(`${this.apiUrl}/carts`, payload);
  }

  loadCartItems(userId: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/carts?userId=${userId}`);
}

  getCartItems(userId: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/carts?userId=${userId}`);
  }

  getAll(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/carts`);
  }
  

  updateCartItemQuantity(productId: string, newQuantity: number, oldQuantity:string): Observable<any> {
    
    const partialData = {
      products: [{ productId:productId, quantity: newQuantity }]
    };
    return this.http.patch(`${this.apiUrl}/carts/?id=${productId}`, partialData);
  }


  deleteItems(cartId:string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/carts/${cartId}`)

  }
  

}
