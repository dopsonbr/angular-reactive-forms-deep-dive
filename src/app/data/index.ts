import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromOrderLine from './order-lines/order-line.reducer';
import * as fromProduct from './products/product.reducer';
import * as fromCustomer from './customers/customer.reducer';
import {localStorageSync} from 'ngrx-store-localstorage';

export interface State {
  readonly [fromOrderLine.orderLinesFeatureKey]: fromOrderLine.OrderLinesState;
  readonly [fromProduct.productsFeatureKey]: fromProduct.State;
  readonly [fromCustomer.customersFeatureKey]: fromCustomer.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromOrderLine.orderLinesFeatureKey]: fromOrderLine.reducer,
  [fromProduct.productsFeatureKey]: fromProduct.reducer,
  [fromCustomer.customersFeatureKey]: fromCustomer.reducer,
};

export function localStorageSyncReducer(reducerToSync: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [fromOrderLine.orderLinesFeatureKey,
      fromProduct.productsFeatureKey,
      fromCustomer.customersFeatureKey],
    // rehydrate: true,
    storage: sessionStorage,
    removeOnUndefined: true,
    restoreDates: false
  })(reducerToSync);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];

