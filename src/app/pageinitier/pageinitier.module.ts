import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageinitierPageRoutingModule } from './pageinitier-routing.module';

import { PageinitierPage } from './pageinitier.page';
import { ProductsPage } from '../products/products.page';
import { ProductsPageModule } from '../products/products.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageinitierPageRoutingModule, 
    ProductsPageModule
  ],
  declarations: [PageinitierPage]
})
export class PageinitierPageModule {}
