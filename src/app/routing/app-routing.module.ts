import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../components/shared/layout/layout.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../components/product/product.module').then(m => m.ProductModule),
      },
      // {
      //   path: 'order',
      //   loadChildren: () => import('../components/order/order.module').then(m => m.OrderModule),
      // }
    ] 
  },
  
];

 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
