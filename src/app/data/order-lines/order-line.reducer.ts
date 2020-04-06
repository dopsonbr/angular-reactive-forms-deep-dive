import {Action, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import * as OrderLineActions from './order-line.actions';
import {OrderLine} from '../../models/order-line';

export const orderLinesFeatureKey = 'orderLines';

export interface OrderLinesState extends EntityState<OrderLine> {
  // additional entities state properties
}

export const adapter: EntityAdapter<OrderLine> = createEntityAdapter<OrderLine>();

export const initialState: OrderLinesState = adapter.getInitialState({
  // additional entity state properties
});

const orderLineReducer = createReducer(
  initialState,
  on(OrderLineActions.addOrderLine,
    (state, action) => adapter.addOne(action.orderLine, state)
  ),
  on(OrderLineActions.upsertOrderLine,
    (state, action) => adapter.upsertOne(action.orderLine, state)
  ),
  on(OrderLineActions.addOrderLines,
    (state, action) => adapter.addMany(action.orderLines, state)
  ),
  on(OrderLineActions.upsertOrderLines,
    (state, action) => adapter.upsertMany(action.orderLines, state)
  ),
  on(OrderLineActions.updateOrderLine,
    (state, action) => adapter.updateOne(action.orderLine, state)
  ),
  on(OrderLineActions.updateOrderLines,
    (state, action) => adapter.updateMany(action.orderLines, state)
  ),
  on(OrderLineActions.deleteOrderLine,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(OrderLineActions.deleteOrderLines,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(OrderLineActions.loadOrderLines,
    (state, action) => adapter.setAll(action.orderLines, state)
  ),
  on(OrderLineActions.clearOrderLines,
    state => adapter.removeAll(state)
  ),
  on(OrderLineActions.updateQuantity,
    (state, action) => adapter.updateOne({id: action.id, changes: {quantity: action.quantity}}, state))
);

export function reducer(state: OrderLinesState | undefined, action: Action): OrderLinesState {
  return orderLineReducer(state, action);
}
