import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { ProductViewModel } from '../view-models/product.model';
import { ProductSearchViewModel } from '../view-models/product-search.model';
import { ProductService } from '../product.service';
import { CrudIndexBaseUtils } from 'src/app/components/shared/utils/crud-index.utils';
import { CRUDCreatePage } from 'src/app/model/crud-create.model';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent extends CrudIndexBaseUtils implements OnInit {
  pageCreate: CRUDCreatePage = new CRUDCreatePage();
  products: ProductViewModel[] = [];
  selectedItem: ProductViewModel = new ProductViewModel();
  modalRef: BsModalRef;
  searchViewModel: ProductSearchViewModel = new ProductSearchViewModel();
  paymentMethod: string[] = []

  @ViewChild('deleteTemplate', { static: false }) deleteTemplate: any;
  @ViewChild('createOrEditProductTemplate', { static: false }) createOrEditProductTemplate: any;
  @ViewChild('createOrderTemplate', { static: false }) createOrderTemplate: any;

  constructor(
    private _pageService: ProductService,
    public _sharedService: SharedService,
  ) {
    super(_sharedService);
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
    this.createSearchForm();
    this.search()
  }
  createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({
      // ID: [this.searchViewModel.ID],
    });
    this.page.isPageLoaded = true;
  }
  search() {
    this.page.isSearching = true;
    this.products = [];
    this._pageService.getProducts().subscribe(response => {
      this.page.isSearching = false;
      this.products = response as ProductViewModel[];
    });
  }

  showCreateOrEditTamplete(selectedItem: ProductViewModel) {
    this.selectedItem = selectedItem ? selectedItem : new ProductViewModel();
    this.createProductForm();
    this.modalRef = this._sharedService.modalService.show(this.createOrEditProductTemplate, { class: 'modal-440', });
  }

  createProductForm() {
    this.pageCreate.form = this._sharedService.formBuilder.group({
      ProductName: [this.selectedItem.ProductName, [Validators.required]],
      ProductPrice: [this.selectedItem.ProductPrice, [Validators.required]],
      AvailablePieces: [this.selectedItem.AvailablePieces, [Validators.required]],
    });
  }

  createOrEditProduct() {
    Object.assign(this.selectedItem, this.pageCreate.form.value);
    if (this.selectedItem.ProductId) {
      this._sharedService.showSuccessAlert("Succesfuly Update");
    }
    else {
      this.products.push(this.selectedItem);
      this._sharedService.showSuccessAlert("Succesfuly Update");
    }
  }

  disabledSummitProduct() {
    return !this.pageCreate.form.valid
  }

  showDeleteConfirmation(selectedItem: ProductViewModel) {
    this.selectedItem = selectedItem;
    this.modalRef = this._sharedService.modalService.show(this.deleteTemplate, { class: 'modal-440', });
  }

  removeProduct() {
    this.products.splice(this.products.findIndex(i => i.ProductId == this.selectedItem.ProductId), 1);
    this.modalRef.hide();
  }

  isProductHaveAfewQuantities(item: ProductViewModel) {
    return item.AvailablePieces < 20
  }

  showCreateOrderTamplet() {
    this.createOrderForm()
    this.modalRef = this._sharedService.modalService.show(this.createOrderTemplate, { class: 'modal-700', });
  }

  createOrderForm() {
    this.pageCreate.form = this._sharedService.formBuilder.group({
      CustomerName: [, [Validators.required]],
      PaymentType: [, [Validators.required]]
    });
  }
  
  disabledSummitOrder() {
    return !this.pageCreate.form.valid || this.products.filter(i => i.isSelected).length == 0
  }
}
