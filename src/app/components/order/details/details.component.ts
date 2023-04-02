import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/service/shared.service';
import { CRUDCreatePage } from 'src/app/model/crud-create.model';
import { OrderUserViewModel, OrderViewModel } from '../view-models/order.model';
import { OrderSearchViewModel } from '../view-models/order-search.model';
import { OrderService } from '../order.service';
import { ProductViewModel } from '../../product/view-models/product.model';
import { ProductService } from '../../product/product.service';
import { SimplePaginationService } from '../../shared/component/simple-pagination/simple-pagination.service';
import { ActivatedRoute } from '@angular/router';
import { CRUDIndexPage } from 'src/app/model/crud-index.model';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-index',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']

})
export class DetailsComponent implements OnInit {
  page: CRUDIndexPage = new CRUDIndexPage();
  orders: OrderViewModel[] = [];
  selectedOrder: OrderViewModel = new OrderViewModel();
  products: ProductViewModel[] = []
  users: OrderUserViewModel[] = []
  modalRef: BsModalRef;
  searchViewModel: OrderSearchViewModel = new OrderSearchViewModel();

  @ViewChild('deleteTemplate', { static: false }) deleteTemplate: any;

  constructor(
    private _pageService: OrderService,
    private _productService: ProductService,
    public _sharedService: SharedService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.initializePage();
  }
  initializePage() {
    this.page.columns = [
      { Name: "title", Title: "shared.product", Selectable: true, Sortable: false },
      { Name: "price", Title: "shared.price", Selectable: true, Sortable: false },
      { Name: "count", Title: "shared.count", Selectable: true, Sortable: false },
    ];
    forkJoin([
      this._pageService.getOrders(),
      this._productService.getProducts(),
      this._pageService.getUsers()
    ]).subscribe((res) => {
      this.orders = res[0];
      this.products = res[1];
      this.users = res[2];
      this.activatedRoute.params.subscribe(params => {

        this.selectedOrder = this.getOrderByID(+params['id'])
        this.page.isLoading = true
      })
    });

  }


  getOrderByID(id: number) {
    return this.orders.find(order => order.OrderId == id);
  }

  getUserByID(id: number) {
    return this.users.find(user => user.Id == id);
  }

  getProductByID(id: number) {
    return this.products.find(product => product.ProductId == id);
  }


}
