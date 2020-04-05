import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromOrderLine from './order-lines/order-line.reducer';
import * as fromProduct from './products/product.reducer';

export interface State {
  [fromOrderLine.orderLinesFeatureKey]: fromOrderLine.OrderLinesState;
  [fromProduct.productsFeatureKey]: fromProduct.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromOrderLine.orderLinesFeatureKey]: fromOrderLine.reducer,
  [fromProduct.productsFeatureKey]: fromProduct.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

