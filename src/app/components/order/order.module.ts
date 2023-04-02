import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { OrderService } from './order.service';
import { DetailsComponent } from './details/details.component';



export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: ':id', component: DetailsComponent },
]


@NgModule({
  declarations: [
    IndexComponent, DetailsComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule
  ],
  providers: [OrderService]

})
export class OrderModule { }
