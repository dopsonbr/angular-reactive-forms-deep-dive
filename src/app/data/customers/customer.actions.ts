import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Customer } from './customer.model';

export const loadCustomers = createAction(
  '[Customer/API] Load Customers', 
  props<{ customers: Customer[] }>()
);

export const addCustomer = createAction(
  '[Customer/API] Add Customer',
  props<{ customer: Customer }>()
);

export const upsertCustomer = createAction(
  '[Customer/API] Upsert Customer',
  props<{ customer: Customer }>()
);

export const addCustomers = createAction(
  '[Customer/API] Add Customers',
  props<{ customers: Customer[] }>()
);

export const upsertCustomers = createAction(
  '[Customer/API] Upsert Customers',
  props<{ customers: Customer[] }>()
);

export const updateCustomer = createAction(
  '[Customer/API] Update Customer',
  props<{ customer: Update<Customer> }>()
);

export const updateCustomers = createAction(
  '[Customer/API] Update Customers',
  props<{ customers: Update<Customer>[] }>()
);

export const deleteCustomer = createAction(
  '[Customer/API] Delete Customer',
  props<{ id: string }>()
);

export const deleteCustomers = createAction(
  '[Customer/API] Delete Customers',
  props<{ ids: string[] }>()
);

export const clearCustomers = createAction(
  '[Customer/API] Clear Customers'
);
