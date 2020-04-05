import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {addOrderLines} from './reducers/order-lines/order-line.actions';
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
      listPrice: 5
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
      listPrice: 1
    }
  }
];

@Component({
  selector: 'app-root',
  template: '<app-cart></app-cart>',
})
export class AppComponent implements OnInit {

  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    // only used for seed data
    this.store.dispatch(addOrderLines({orderLines: ORDER_LINES_DATA}));
  }
}
