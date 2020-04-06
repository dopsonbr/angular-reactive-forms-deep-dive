import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Customer } from './customer.model';
import * as CustomerActions from './customer.actions';

export const customersFeatureKey = 'customers';

export interface State extends EntityState<Customer> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

const customerReducer = createReducer(
  initialState,
  on(CustomerActions.addCustomer,
    (state, action) => adapter.addOne(action.customer, state)
  ),
  on(CustomerActions.upsertCustomer,
    (state, action) => adapter.upsertOne(action.customer, state)
  ),
  on(CustomerActions.addCustomers,
    (state, action) => adapter.addMany(action.customers, state)
  ),
  on(CustomerActions.upsertCustomers,
    (state, action) => adapter.upsertMany(action.customers, state)
  ),
  on(CustomerActions.updateCustomer,
    (state, action) => adapter.updateOne(action.customer, state)
  ),
  on(CustomerActions.updateCustomers,
    (state, action) => adapter.updateMany(action.customers, state)
  ),
  on(CustomerActions.deleteCustomer,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CustomerActions.deleteCustomers,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CustomerActions.loadCustomers,
    (state, action) => adapter.setAll(action.customers, state)
  ),
  on(CustomerActions.clearCustomers,
    state => adapter.removeAll(state)
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return customerReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
