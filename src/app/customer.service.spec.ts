import { TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { CUSTOMER_DATA_SOURCE_TOKEN } from '../datasource/customer-data-source';
import {
  TestCustomerDataSource,
  customerServiceMockResponse,
} from '../datasource/test-customer-data-source';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CUSTOMER_DATA_SOURCE_TOKEN,
          useClass: TestCustomerDataSource,
        },
        CustomerService,
      ],
    });
    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all customers', waitForAsync(() => {
    service.getCustomers().subscribe((customers) => {
      expect(customers).toEqual(customerServiceMockResponse);
    });
  }));

  it('should return a single customer by id', waitForAsync(() => {
    service
      .getCustomer(customerServiceMockResponse[0].id)
      .subscribe((customer) => {
        expect(customer).toEqual(customerServiceMockResponse[0]);
      });
  }));

  it('should return a filtered list of customers', waitForAsync(() => {
    // Take a substring of the first customer's surname
    const searchTerm = customerServiceMockResponse[0].surname.substring(0, 3);

    service.searchCustomers(searchTerm).subscribe((customers) => {
      expect(customers).toContain(customerServiceMockResponse[0]);
      expect(customers).not.toContain(customerServiceMockResponse[1]);
    });
  }));

  it('handles gracefully when an empty search term is provided', waitForAsync(() => {
    service.searchCustomers(null).subscribe((customers) => {
      expect(customers).toEqual(customerServiceMockResponse);
    });
  }));
});
