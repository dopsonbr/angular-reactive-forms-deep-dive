import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {addOrderLines} from './data/order-lines/order-line.actions';
import {OrderLine} from './models/order-line';

const ORDER_LINES_DATA: OrderLine[] = [
  {
    id: 'ol1',
    quantity: 1,
    salePrice: 5,
    product: {
      id: 'p1',
      description: 'hammer',
      unitOfMeasure: 'EA',
      listPrice: 5,
      quantityLimit: 10
    }
  },
  {
    id: 'ol2',
    quantity: 2.5,
    salePrice: 1,
    product: {
      id: 'p2',
      description: 'rope',
      unitOfMeasure: 'LF',
      listPrice: 1,
      quantityLimit: 10
    }
  }
];

@Component({
  selector: 'app-root',
  template: `
    <nz-tabset>
      <nz-tab nzTitle="Plain Reactive Forms">
        <app-cart></app-cart>
      </nz-tab>
      <nz-tab nzTitle="ngx-sub-form">WIP</nz-tab>
      <nz-tab nzTitle="@ngneat/form-manager">WIP</nz-tab>
      <nz-tab nzTitle="ngrx-forms">WIP</nz-tab>
    </nz-tabset>
  `,
})
export class AppComponent implements OnInit {

  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    // only used for seed data
    this.store.dispatch(addOrderLines({orderLines: ORDER_LINES_DATA}));
  }
}
