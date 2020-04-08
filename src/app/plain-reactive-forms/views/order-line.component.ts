import {Component, OnInit, ChangeDetectionStrategy, forwardRef, OnDestroy} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {OrderLine} from '../../models/order-line';
import {Subject} from 'rxjs';
import {filter, takeUntil, tap} from 'rxjs/operators';
import {UnitOfMeasure} from '../../models/product';

@Component({
  selector: 'app-order-line',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrderLineComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OrderLineComponent),
      multi: true
    }
  ],
  template: `
    <nz-card nzTitle="order-line-form">
      <form [formGroup]="orderLineForm">
        <div class="ant-row-flex ant-row-flex-space-between">
          <nz-descriptions>
            <nz-descriptions-item nzTitle="Description">{{orderLine?.product.description}}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="Price">{{orderLine?.product.listPrice | currency}}</nz-descriptions-item>
          </nz-descriptions>
          <app-quantity-editor [formControl]="quantity"
                               [unitOfMeasure]="unitOfMeasure"
                                >
          </app-quantity-editor>
        </div>
      </form>
      <app-form-debug name='order-line-form' [form]="orderLineForm"></app-form-debug>
    </nz-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderLineComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private _orderLine: OrderLine | undefined;
  private readonly destroySubject = new Subject();

  // todo add validator for quantity > productQuantity limit
  readonly orderLineForm = this.fb.group({
    quantity: [1]
  });

  constructor(private  fb: FormBuilder) {
  }

  ngOnInit(): void {
    console.log('order-line:ngOnInit');
    this.orderLineForm.valueChanges
      .pipe(
        takeUntil(this.destroySubject),
        tap(next => {
          console.log('order-line-component:orderLineForm.valueChanges', next);
          // this.onTouched();
          // this type is not real because next will always be an any because of how .valueChanges works
          this.propagateChange({...this._orderLine, ...next});
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    console.log('order-line:ngOnDestroy', this._orderLine?.id);
    this.destroySubject.next({});
    this.destroySubject.complete();
  }

  set orderLine(ol: OrderLine | undefined) {
    this._orderLine = ol;
    this.quantity.patchValue(this._orderLine?.quantity);
  }

  get orderLine(): OrderLine | undefined {
    return this._orderLine;
  }

  get quantity(): FormControl {
    return this.orderLineForm.get('quantity') as FormControl;
  }

  get unitOfMeasure(): UnitOfMeasure {
    return this._orderLine?.product.unitOfMeasure ?? 'EA';
  }

  onTouched(): void {
  }

  propagateChange(_: OrderLine): void {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // this type signature isn't enforced
  // the only type error you can actually catch is if the signature of the setter changes
  writeValue(ol: OrderLine): void {
    this.orderLine = ol;
  }

  validate(_: FormControl): ValidationErrors | null {
    if (this.orderLineForm.invalid) {
      this.orderLineForm.setErrors({quantity: this.quantity.errors});
      return {quantity: this.quantity.errors};
    }
    return null;
  }

}
