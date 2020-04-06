/* tslint:disable:readonly-keyword */
import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {OrderLine} from '../../models/order-line';


export const loadOrderLines = createAction(
  '[OrderLine/API] Load OrderLines',
  props<{ orderLines: OrderLine[] }>()
);

export const addOrderLine = createAction(
  '[OrderLine/API] Add OrderLine',
  props<{ orderLine: OrderLine }>()
);

export const upsertOrderLine = createAction(
  '[OrderLine/API] Upsert OrderLine',
  props<{ orderLine: OrderLine }>()
);

export const addOrderLines = createAction(
  '[OrderLine/API] Add OrderLines',
  props<{ orderLines: OrderLine[] }>()
);

export const upsertOrderLines = createAction(
  '[OrderLine/API] Upsert OrderLines',
  props<{ orderLines: OrderLine[] }>()
);

export const updateOrderLine = createAction(
  '[OrderLine/API] Update OrderLine',
  props<{ orderLine: Update<OrderLine> }>()
);

export const updateOrderLines = createAction(
  '[OrderLine/API] Update OrderLines',
  props<{ orderLines: Update<OrderLine>[] }>()
);

export const deleteOrderLine = createAction(
  '[OrderLine/API] Delete OrderLine',
  props<{ id: string }>()
);

export const deleteOrderLines = createAction(
  '[OrderLine/API] Delete OrderLines',
  props<{ ids: string[] }>()
);

export const clearOrderLines = createAction(
  '[OrderLine/API] Clear OrderLines'
);

export const updateQuantity = createAction(
  '[OrderLine/API] Update order line quantity',
  props<{ id: string, quantity: number }>()
);
