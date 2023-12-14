import { Observable } from 'rxjs';
import { Customer } from '../app/models/customer.model';
import { InjectionToken } from '@angular/core';
export const CUSTOMER_DATA_SOURCE_TOKEN =
  new InjectionToken<CustomerDataSource>('CustomerDataSource');

/**
 * Implementation of a mock data source
 *
 * This interface is provided a concrete class at runtime.
 *
 * This allows us to use dependency injection to provide a mock data source
 * during testing, and bind 'real' data sources in dev and prod.
 */
export interface CustomerDataSource {
  get(): Observable<Customer[]>;
  getById(id: string): Observable<Customer | null>;
}
