/* tslint:disable */
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef, OnInit, OnDestroy
} from '@angular/core';
import {
  ControlValueAccessor, FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {pluck, takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {UnitOfMeasure} from '../../models/product';

@Component({
  selector: 'app-quantity-editor',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuantityEditorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => QuantityEditorComponent),
      multi: true
    }
  ],
  template: `
    <ng-container [ngSwitch]="unitOfMeasure">
      <nz-card>
        <form [formGroup]="quantityEditorForm">
          <app-linear-foot-quantity-editor *ngSwitchCase="'LF'" [formControl]="linearFeet">

          </app-linear-foot-quantity-editor>
          <app-default-quantity-editor
            *ngSwitchDefault
            [formControl]="defaultQuantity"
          ></app-default-quantity-editor>
          <div>quantity-editor status {{quantityEditorForm.status}}</div>
          <div>quantity-editor rawValue {{quantityEditorForm.getRawValue() | json}}</div>
        </form>
      </nz-card>
    </ng-container>
  `,
})
export class QuantityEditorComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  private _destroySubject$ = new Subject();

  @Input() readonly unitOfMeasure: UnitOfMeasure = 'EA';

  readonly quantityEditorForm = this.fb.group({
    EA: [],
    LF: []
  });

  constructor(private fb: FormBuilder) {
  }

  private _propagateChange: any = () => {
  };

  private _onTouched():void {}

  set quantity(qty: number) {
    this.quantityEditorForm.get(this.unitOfMeasure)?.patchValue(qty);
  }

  get defaultQuantity(): FormControl {
    return this.quantityEditorForm.get('EA') as FormControl;
  }

  get linearFeet(): FormControl {
    return this.quantityEditorForm.get('LF') as FormControl;
  }

  ngOnInit(): void {
    this.quantityEditorForm.valueChanges
      .pipe(
        takeUntil(this._destroySubject$),
        pluck(this.unitOfMeasure),
        tap(next => {
          console.log('quantity-editor:valueChanges', next);
          this._propagateChange(next);
          this._onTouched();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroySubject$.next({});
    this._destroySubject$.complete();
  }

  registerOnChange(fn: any): void {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  writeValue(val: number): void {
    this.quantity = val;
  }

  validate(_: FormControl): ValidationErrors | null {
    return this.quantityEditorForm.valid ? null : {'invalid-quantity': true};
  }

}
