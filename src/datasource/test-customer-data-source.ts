import { Observable, of } from 'rxjs';
import { Customer } from '../app/models/customer.model';
import { CustomerDataSource } from './customer-data-source';

/**
 * These customer records are an excerpt from the mock data
 * created by `dev/seed.mjs`.
 *
 * They are placed here to allow for availability in multiple
 * test files.
 */
export const customerServiceMockResponse = [
  {
    id: 'c3a964ef-9ce3-439c-95ad-1114fcecd97d',
    initials: 'Q.O.C',
    surname: 'Jong',
    surnamePrefix: 'de',
    sex: 'female',
    birthDate: '12-1-1946',
    streetName: 'Fleurweg',
    postalCode: '4856 JP',
    houseNumber: '85',
    houseNumberExtension: null,
  },
  {
    id: 'ea5032a2-039e-4911-8378-b2e84535386c',
    initials: 'Y.Y.O',
    surname: 'Wal',
    surnamePrefix: 'van der',
    sex: 'male',
    birthDate: '31-12-1991',
    streetName: 'van Vlietlaan',
    postalCode: '2747 FD',
    houseNumber: '83',
    houseNumberExtension: null,
  },
  {
    id: 'ac940fca-ae3f-4f57-a76b-ee7bb1d30608',
    initials: 'Y.M.I',
    surname: 'Bruijn',
    surnamePrefix: 'de',
    sex: 'female',
    birthDate: '4-7-2002',
    streetName: 'van Doornlaan',
    postalCode: '3679 YO',
    houseNumber: '22',
    houseNumberExtension: null,
  },
] as Customer[];

export class TestCustomerDataSource implements CustomerDataSource {
  get(): Observable<Customer[]> {
    return of(customerServiceMockResponse);
  }
  getById(id: string): Observable<Customer | null> {
    return of(
      customerServiceMockResponse.find((customer) => customer.id === id) ?? null
    );
  }
}
