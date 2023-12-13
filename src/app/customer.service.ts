import { Injectable } from '@angular/core';
import { Customer, Sex } from './models/customer.model';
import customersJson from '../assets/customers.json';
import { Observable, of } from 'rxjs';

export type CustomerResponse = {
  customers: Customer[];
  total: number;
};

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  getCustomer(customerId: string): Observable<Customer | null> {
    if (!customerId) {
      return of(null);
    }

    const customer = this.getCustomersFromDatabase().find(
      (customer) => customer.id === customerId
    );

    return of(customer ?? null);
  }

  searchCustomers(searchTerm: string | null): Observable<CustomerResponse> {
    const customers = this.getCustomersFromDatabase().filter(
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
    );

    return of({
      customers,
      total: customers.length,
    });
  }
  constructor() {}

  /**
   * Get all customers from the database
   *
   * @note Implemented as an observable to simulate an asynchronous call to a database.
   */
  public getCustomers(): Observable<CustomerResponse> {
    return of({
      customers: this.getCustomersFromDatabase(),
      total: customersJson.length,
    });
  }

  private getCustomersFromDatabase(): Customer[] {
    return customersJson.map((customer) => ({
      ...customer,
      sex: Sex[
        (Object.entries(Sex).find(
          ([_key, value]) => value === customer.sex
        )?.[0] ?? 'Other') as keyof typeof Sex
      ],
    }));
  }
}
