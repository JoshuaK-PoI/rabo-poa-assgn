import { CustomerDataSource } from './customer-data-source';
import customersJson from '../assets/customers.json';
import { Customer, Sex } from '../app/models/customer.model';
import { Observable, of } from 'rxjs';

export class DevCustomerDataSource implements CustomerDataSource {
  public get(): Observable<Customer[]> {
    return of(this._get());
  }

  public getById(id: string): Observable<Customer | null> {
    return of(this._get().find((customer) => customer.id === id) ?? null);
  }

  private _get() {
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
