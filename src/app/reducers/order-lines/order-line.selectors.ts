import {adapter, orderLinesFeatureKey, OrderLinesState} from './order-line.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const getOrderLinesState = createFeatureSelector<OrderLinesState>(
  orderLinesFeatureKey
);

export const getAllOrderLines = createSelector(getOrderLinesState, selectAll);
