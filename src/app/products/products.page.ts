import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../services/products-service.service';
import { Product } from '../model/product';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  quantities: number[];
  constructor(private productsService: ProductsServiceService,  private cartService: CartService, private router:Router,private authService: AuthenticationService) { }
  private userId: string
  ngOnInit() {
    this.loadProducts();
    this.userId = this.authService.getCurrentUserId();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.quantities = new Array(this.products.length).fill(1);
        // console.log(this.products)
      },
      error: (err) => {
        console.error('Error al cargar los productos:', err);
      }
    });
  }

  selectProduct(product: Product) {
    console.log('Producto seleccionado:', product);
  }
  goToCart(){
    this.router.navigate(['/cart']);
  }
  addToCart(product: Product, quantity: number, position:number) {
   
    console.log(this.userId)
    if (quantity > 0) {
      this.cartService.addProductToCart(this.userId,product.id, quantity).subscribe({
        next: (response) => {
          console.log('Producto añadido al carrito:', response);
          this.quantities[position] =1
        },
        error: (error) => {
          console.error('Error añadiendo al carrito:', error);
        }
      });
    }
  }
  

}
