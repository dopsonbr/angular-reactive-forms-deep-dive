import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrderLineComponent } from './v1/dumb-components/order-line.component';
import { QuantityEditorComponent } from './v1/dumb-components/quantity-editor.component';
import { DefaultQuantityEditorComponent } from './v1/dumb-components/default-quantity-editor.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CartComponent } from './v1/cart.component';
import { SummaryComponent } from './v1/dumb-components/summary.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { LinearFootQuantityEditorComponent } from './v1/dumb-components/linear-foot-quantity-editor.component';
import { ProductComponent } from './v1/dumb-components/product.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    OrderLineComponent,
    QuantityEditorComponent,
    DefaultQuantityEditorComponent,
    CartComponent,
    SummaryComponent,
    LinearFootQuantityEditorComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument()
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
