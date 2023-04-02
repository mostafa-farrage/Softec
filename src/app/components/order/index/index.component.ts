import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/service/shared.service';
import { CrudIndexBaseUtils } from 'src/app/components/shared/utils/crud-index.utils';
import { CRUDCreatePage } from 'src/app/model/crud-create.model';
import { OrderViewModel } from '../view-models/order.model';
import { OrderSearchViewModel } from '../view-models/order-search.model';
import { OrderService } from '../order.service';
import { ProductViewModel } from '../../product/view-models/product.model';
import { ProductService } from '../../product/product.service';
import { SimplePaginationService } from '../../shared/component/simple-pagination/simple-pagination.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']

})
export class IndexComponent extends CrudIndexBaseUtils implements OnInit {
  pageCreate: CRUDCreatePage = new CRUDCreatePage();
  items: OrderViewModel[] = [];
  selectedItem: OrderViewModel = new OrderViewModel();
  products : ProductViewModel [] = []
  modalRef: BsModalRef;
  searchViewModel: OrderSearchViewModel = new OrderSearchViewModel();

  @ViewChild('deleteTemplate', { static: false }) deleteTemplate: any;

  constructor(
    private _pageService: OrderService,
    private _productService: ProductService,
    public _sharedService: SharedService,
    public simplePaginationSer: SimplePaginationService,
  ) {
    super(_sharedService);
  }

  ngOnInit() {
    this.initializePage();
  }
  initializePage() {
    this.page.columns = [
      { Name: "", Title: "ID", Selectable: true, Sortable: false },
      { Name: "PaymentType", Title: "order.payment-method", Selectable: true, Sortable: false },
      { Name: "count", Title: "shared.price", Selectable: true, Sortable: false },
    ];
    this.createSearchForm();
    this.search()
    this.getProducts()
  }

  createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({
      // ID: [this.searchViewModel.ID],
    });
    this.page.isPageLoaded = true;
  }

  search() {
    this.page.isSearching = true;
    this.items = [];
    this._pageService.getOrders().subscribe(response => {
      this.page.isSearching = false;
      this.items = response as OrderViewModel[];
      this.simplePaginationSer.initPagination(this.items, 20)

    });
  }

  getProducts(){
    this._productService.getProducts().subscribe(response => {
      this.products = response as ProductViewModel[];
    });
  }

  showDeleteConfirmation(selectedItem: OrderViewModel) {
    this.selectedItem = selectedItem;
    this.modalRef = this._sharedService.modalService.show(this.deleteTemplate, { class: 'modal-440', });
  }
  
  removeOrder() {
    this.items.splice(this.items.findIndex(i => i.OrderId == this.selectedItem.OrderId), 1);
    this.modalRef.hide();
  }

  getProductPriceById(productId: number): number {
    return this.products.find(prod => prod.ProductId == productId)?.ProductPrice
  }

  getTotalPrice(products:ProductViewModel[]): number {
    let totalPrice = 0;
    products.forEach(product => {
      const productPrice = this.getProductPriceById(product.ProductId);
      totalPrice += product.Quantity * productPrice;
    });
    return totalPrice;
  }

  getNextPage() {
    this.simplePaginationSer.getNextPage();
  }

  getPrevPage() {
    this.simplePaginationSer.getPrevPage();
  }


}
