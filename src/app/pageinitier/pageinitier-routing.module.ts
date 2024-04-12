import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageinitierPage } from './pageinitier.page';

const routes: Routes = [
  {
    path: '',
    component: PageinitierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageinitierPageRoutingModule {}
