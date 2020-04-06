import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-debug',
  template: `
    <nz-descriptions nzBordered nzSize="small">
      <nz-descriptions-item nzTitle="status">{{form?.status}}</nz-descriptions-item>
      <nz-descriptions-item nzTitle="raw-value">{{form?.value| json}}</nz-descriptions-item>
      <nz-descriptions-item nzTitle="errors">{{form?.errors | json}}</nz-descriptions-item>
    </nz-descriptions>
  `,
  // on push can not be used here
  changeDetection:ChangeDetectionStrategy.Default
})
export class FormDebugComponent {

  @Input()
  readonly form: FormGroup | AbstractControl | undefined;
  @Input()
  readonly name: string | undefined;
}
