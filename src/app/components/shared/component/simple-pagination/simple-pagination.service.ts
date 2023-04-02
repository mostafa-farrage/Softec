import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SimplePaginationService {
  data: any[] = [];
  spOptions = {
    itemsPerPage: 10,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    viewItemsCountStart: 0,
    viewItemsCountEnd: 0,
    hasPrevPage: false,
    hasNextPage: false,
    pagedData: []
  };
  initPagination(data: any[], itemsPerPage: number) {
    this.data = data;
    this.spOptions.itemsPerPage = itemsPerPage;
    this.spOptions.totalItems = data.length;
    this.spOptions.totalPages = this.getPageArray().length;
    this.updatePage(1);
  }

  updatePage(pageNumber: number) {
    this.spOptions.currentPage = pageNumber;
    const startIndex = (pageNumber - 1) * this.spOptions.itemsPerPage;
    const endIndex = startIndex + this.spOptions.itemsPerPage;
    this.spOptions.pagedData = this.data.slice(startIndex, endIndex);
    this.spOptions.viewItemsCountStart = startIndex + 1;
    this.spOptions.viewItemsCountEnd = Math.min(endIndex, this.spOptions.totalItems);
    this.spOptions.hasPrevPage = pageNumber > 1;
    this.spOptions.hasNextPage = pageNumber < this.spOptions.totalPages;
  }
  getPageArray(): number[] {
    const pageCount = Math.ceil(this.data.length / this.spOptions.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  getNextPage() {
    if (this.spOptions.currentPage < this.spOptions.totalPages) {
      this.updatePage(this.spOptions.currentPage + 1);
    }
  }

  getPrevPage() {
    if (this.spOptions.currentPage > 1) {
      this.updatePage(this.spOptions.currentPage - 1);
    }
  }
}
