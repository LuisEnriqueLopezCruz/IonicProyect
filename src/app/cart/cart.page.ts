import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ProductsServiceService } from '../services/products-service.service';
import { ProductInCart } from '../model/productsinCart';
import { Product } from '../model/product';
import { Cart } from '../model/cartModel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  private userId: string;
  productDetails: any[] = [];
  quantity: any[] = [];
  cartItemsPerUser: any[] = [];
  item1:any;
  actual:any;
  constructor(
    private cartService: CartService,
    private productService: ProductsServiceService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
    this.loadCartItems();
    console.log(this.userId);
    
  }


  deleteItem(quantity: number, item: any) {
    
    let nu: number =0
    console.log(item)
    
    this.cartService.loadCartItems(this.userId).subscribe(carts =>{
      this.item1 =carts
      
      // console.log(carts)
});
    this.actual = this.item1[item]
    console.log(this.actual)

    if (quantity > 1) {
      this.cartService
        .updateCartItemQuantity(this.actual.id, quantity, this.actual.products.productId)
        .subscribe({
          next: (response) =>
            console.log('Quantity updated successfully', response),
          error: (error) => console.error('Failed to update quantity', error),
        });
    }
  }
  loadCartItems() {
    this.cartService.loadCartItems(this.userId).subscribe({
      next: (carts) => {
        this.enrichCartItems(carts);
      },
      error: (error) => {
        console.error('Error al cargar el carrito:', error);
      },
    });
  }
  
  enrichCartItems(carts: Cart[]) {
    let items: ProductInCart[] = [];
    if (carts.length > 0) {
      items = carts.flatMap(cart => cart.products);
    }
    items.forEach((item) => {
      this.productService.getProductById(item.productId).subscribe({
        next: (product: Product) => {
          console.log(product);
          this.productDetails[item.productId] = product[0];
          this.quantity[item.productId] = item.quantity || 1;  
        },
        error: (err) => console.error('Error fetching product details:', err),
      });
    });
    this.cartItems = items; 
    console.log(this.cartItems);
  }
  checkout() {
    console.log('Procediendo al checkout...');
  }
}
