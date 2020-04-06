import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {OrderLineComponent} from './views/order-line.component';
import {QuantityEditorComponent} from './views/quantity-editor.component';
import {DefaultQuantityEditorComponent} from './views/default-quantity-editor.component';
import {CartComponent} from './cart.component';
import {SummaryComponent} from './views/summary.component';
import {LinearFootQuantityEditorComponent} from './views/linear-foot-quantity-editor.component';
import { FormDebugComponent } from './views/form-debug.component';


@NgModule({
  declarations: [
    OrderLineComponent,
    QuantityEditorComponent,
    DefaultQuantityEditorComponent,
    CartComponent,
    SummaryComponent,
    LinearFootQuantityEditorComponent,
    FormDebugComponent
  ],
  exports: [CartComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ]
})
export class PlainReactiveFormsModule { }
