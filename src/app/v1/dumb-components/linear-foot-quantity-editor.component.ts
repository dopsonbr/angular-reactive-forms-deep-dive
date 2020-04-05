/* tslint:disable:variable-name semicolon */
import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, forwardRef} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator, Validators
} from '@angular/forms';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-linear-foot-quantity-editor',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LinearFootQuantityEditorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LinearFootQuantityEditorComponent),
      multi: true
    }
  ],
  template: `
    <form nz-form [formGroup]="linearFootQuantity" [nzLayout]="'inline'">
      <nz-form-item>
        <nz-form-label>Feet</nz-form-label>
        <nz-form-control>
          <input nz-input
                 type="number"
                 [formControl]="feet"
                 placeholder="ft"
          />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Inches</nz-form-label>
        <nz-form-control>
          <input nz-input
                 type="number"
                 [formControl]="inches"
                 placeholder="in"
          />
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinearFootQuantityEditorComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  private _destroySubject$ = new Subject();
  readonly linearFootQuantity = this.fb.group({
    feet: [0, [Validators.min]],
    // component implementation specific validators.
    inches: [0, [Validators.min(0), Validators.max(11)]]
  });

  constructor(private fb: FormBuilder) {
  }

  get feet(): FormControl {
    return this.linearFootQuantity.get('feet') as FormControl;
  }

  get inches(): FormControl {
    return this.linearFootQuantity.get('inches') as FormControl;
  }

  set quantity(qty: number) {
    this.feet.patchValue(Math.floor(qty));
    this.inches.patchValue(Math.round((qty % 1) * 12));
  }

  private propagateChange: any = () => {
  };

  ngOnInit(): void {
    this.linearFootQuantity.valueChanges
      .pipe(
        takeUntil(this._destroySubject$),
        map(next => Number((next.inches / 12 + next.feet).toFixed(3)))
      )
      .subscribe(next => this.propagateChange(next));
  }

  ngOnDestroy(): void {
    this._destroySubject$.next({});
    this._destroySubject$.complete();
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(_: any): void {
  }

  writeValue(qty: number): void {
    this.quantity = qty;
  }

  validate(_: FormControl): ValidationErrors | null {
    return this.linearFootQuantity.valid ? null : {'linear-foot-quantity-is-invalid': true};
  }

}
