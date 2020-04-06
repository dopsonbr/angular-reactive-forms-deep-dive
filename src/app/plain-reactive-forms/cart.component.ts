import {Component, ChangeDetectionStrategy, OnDestroy, OnInit, forwardRef} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {getAllOrderLines} from '../data/order-lines/order-line.selectors';
import {debounceTime, distinctUntilChanged, filter, map, takeUntil, tap} from 'rxjs/operators';
import {addOrderLine, updateOrderLine} from '../data/order-lines/order-line.actions';
import {v4 as uuid} from 'uuid';
import {Subject} from 'rxjs';
import {OrderLine} from '../models/order-line';

@Component({
  selector: 'app-cart',
  template: `
    <form [formGroup]="cartForm">
      <nz-card nzTitle="cart-form">
        <nz-layout>
          <nz-content>
            <nz-card nzTitle="order-lines-form" [formGroup]="orderLinesForm">
              <app-order-line
                *ngFor="let ol of orderLinesForm.controls | keyvalue"
                [formControlName]="ol.key"
              >
              </app-order-line>
              <app-form-debug [form]="orderLinesForm"></app-form-debug>
            </nz-card>
          </nz-content>
          <nz-sider>
            <app-summary></app-summary>
            <nz-card>
              <button nz-button nzType="primary" [disabled]="cartForm.invalid">submit</button>
              <button nz-button nzType="danger" (click)="addNewOrderLine()">Add new orderline</button>
              <p>cart-form status {{cartForm.status}}</p>
              <p>cart-form errors {{errors$ | async | json}}</p>
            </nz-card>
          </nz-sider>
        </nz-layout>
      </nz-card>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit, OnDestroy {

  private readonly destroySubject$ = new Subject();

  readonly cartForm = this.fb.group({
    orderLines: this.fb.group({}, Validators.required)
  });


  readonly errors$ = this.cartForm.statusChanges
    .pipe(
      map(status => {
        if (status === 'VALID') {
          return null;
        }
        return Object.values(this.orderLinesForm.controls)
          .filter(c => c.errors)
          .reduce((acc, cur) => {
            console.log('errors found', cur.value.id);
            return {
              ...acc,
              [cur.value.id]: cur.errors
            };
          }, {});
      }),
      tap(_ => {
        console.log(this.orderLinesForm.errors);
        console.log(this.cartForm.errors);
      })
    );

  constructor(private fb: FormBuilder, private store: Store<any>) {
  }

  get orderLinesForm(): FormGroup {
    return this.cartForm.get('orderLines') as FormGroup;
  }

  ngOnInit(): void {
    this.store.pipe(
      takeUntil(this.destroySubject$),
      select(getAllOrderLines),
    ).subscribe(orderLines => {
      orderLines.forEach(ol => {
        if (!this.orderLinesForm.contains(ol.id)) {
          console.log('registering orderline', ol.id);
          const control = this.orderLinesForm.registerControl(ol.id, this.fb.control(ol, Validators.required));
          control.valueChanges.pipe(
            takeUntil(this.destroySubject$),
            filter(_ => control.valid)
          ).subscribe(next => {
            this.store.dispatch(updateOrderLine({orderLine: {id: ol.id, changes: next}}));
          });
        }
      });
    });

  }

  ngOnDestroy(): void {
    this.destroySubject$.next({});
    this.destroySubject$.complete();
  }

  addNewOrderLine(): void {
    const orderLine: OrderLine = {
      id: uuid(),
      quantity: 1,
      salePrice: 2,
      product: {
        id: uuid(),
        description: 'my-new-order-line',
        unitOfMeasure: 'EA',
        listPrice: 2,
        quantityLimit: 100
      }
    };
    this.store.dispatch(addOrderLine({orderLine}));
  }
}
