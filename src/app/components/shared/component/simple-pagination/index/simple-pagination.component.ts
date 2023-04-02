import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-simple-pagination',
  templateUrl: './simple-pagination.component.html',
  styleUrls: ['./simple-pagination.component.scss']
})
export class SimplePaginationComponent {

  // to get prev & next pages
  @Output() callPrev = new EventEmitter();
  @Output() callNext = new EventEmitter();
  @Input() spOptions

  constructor() { }
  ngOnInit(): void {
  }

  // get prev page
  getPrevPage() {
    this.callPrev.emit();
  }

  // get next page
  getNextPage() {
    this.callNext.emit();
  }
}
