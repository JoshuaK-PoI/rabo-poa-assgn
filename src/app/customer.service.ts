import { Inject, Injectable } from '@angular/core';
import { Customer } from './models/customer.model';
import { Observable, map } from 'rxjs';
import {
  CUSTOMER_DATA_SOURCE_TOKEN,
  CustomerDataSource,
} from '../datasource/customer-data-source';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    /**
     * By using an injection token rather than a concrete class,
     * we can choose the data source at runtime.
     * This is beneficial for testing, as we can provide a mock data source
     * during testing.
     */
    @Inject(CUSTOMER_DATA_SOURCE_TOKEN) private dataSource: CustomerDataSource
  ) {}
  getCustomer(customerId: string): Observable<Customer | null> {
    return this.dataSource.getById(customerId);
  }

  /**
   * Note: This functionality should be implemented in the backend.
   *
   * As this assignment is frontend only, this is implemented here.
   */
  searchCustomers(searchTerm: string | null): Observable<Customer[]> {
    return this.dataSource
      .get()
      .pipe(
        map((customers) =>
          customers.filter(
            (customer) =>
              customer.surname
                .toLowerCase()
                .includes(searchTerm?.toLowerCase() ?? '') ||
              customer.initials
                ?.toLowerCase()
                .includes(searchTerm?.toLowerCase() ?? '') ||
              customer.postalCode
                .toLowerCase()
                .includes(searchTerm?.toLowerCase() ?? '')
          )
        )
      );
  }

  public getCustomers(): Observable<Customer[]> {
    return this.dataSource.get();
  }
}
