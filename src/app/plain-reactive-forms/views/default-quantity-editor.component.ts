/* tslint:disable */
import {Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, forwardRef, OnDestroy} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl, FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors, Validator,
  Validators
} from '@angular/forms';
import {takeUntil, tap} from 'rxjs/operators';
import {interval, Subject} from 'rxjs';

@Component({
  selector: 'app-default-quantity-editor',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DefaultQuantityEditorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DefaultQuantityEditorComponent),
      multi: true
    }
  ],
  template: `
    <nz-card>
      <div class="ant-row-flex">
        <button
          nz-button
          nzType="default"
          data-testid="decrement-quantity-button"
          class="increment-btn"
          (click)="decrement()"
        >
          -
        </button>
        <form nz-form [formGroup]="defaultQuantity">
          <nz-form-item>
            <nz-form-control nzHasFeedback [nzErrorTip]="quantityErrorTemplate">
              <input
                nz-input
                type="number"
                id="quantity-text-input"
                data-testid="quantity-text-input"
                [formControl]="quantity"
              />
              <ng-template #quantityErrorTemplate let-control>
                <ng-container *ngIf="quantity.hasError('required')">
                  Quantity is required.
                </ng-container>
                <ng-container *ngIf="quantity.hasError('min')">
                  Please increase quantity.
                </ng-container>
                <ng-container *ngIf="quantity.hasError('max')">
                  Please decrease quantity.
                </ng-container>
              </ng-template>
            </nz-form-control>
          </nz-form-item>
        </form>
        <button
          nz-button
          nzType="default"
          data-testid="increment-quantity-button"
          class="decrement-btn"
          (click)="increment()"
          [disabled]="quantity.hasError('max')"
        >
          +
        </button>
      </div>
      <app-form-debug name="default-quantity-form" [form]="defaultQuantity"></app-form-debug>
    </nz-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultQuantityEditorComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  private destroySubject$ = new Subject();

  private propagateChange: any = () => {
  };
  private _onTouched(): void {
  }
  readonly defaultQuantity = this.fb.group({
    quantity: [0, Validators.min(0)]
  });

  constructor(private fb: FormBuilder) {
  }


  get quantity(): FormControl {
    return this.defaultQuantity.get('quantity') as FormControl;
  }

  decrement(): void {
    this.quantity.patchValue(this.quantity.value - 1);
  }

  increment(): void {
    this.quantity.patchValue(this.quantity.value + 1);
  }

  ngOnInit(): void {
    this.quantity.valueChanges
      .pipe(
        takeUntil(this.destroySubject$),
        tap(next => {
          this.quantity.markAsDirty();
          this.propagateChange(next);
        })
      ).subscribe();

  }

  ngOnDestroy(): void {
    this.destroySubject$.next({});
    this.destroySubject$.complete();
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  writeValue(qty: number): void {
    this.quantity.patchValue(qty);
  }

  validate(value: FormControl): ValidationErrors | null {
    if (value.valid) {
      return null;
    }
    // I'm pretty sure this does nothing. I have no idea why I can not get the errors to show up in the form-debug component but are present everywhere else
    this.defaultQuantity.setErrors(this.quantity.errors);
    return this.quantity.errors;
  }
}
