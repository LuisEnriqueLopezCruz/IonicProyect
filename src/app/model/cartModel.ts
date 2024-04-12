import { ProductInCart } from "./productsinCart";

export interface Cart {
    registro:number;
    userId: string;
    products: ProductInCart[];
  }
  