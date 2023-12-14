import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerService } from '../customer.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { customerServiceMockResponse } from '../../datasource/test-customer-data-source';

/**
 * Mapping from table columns to index
 *
 * This improves readability of the tests, and allows for
 * easy alteration if the table structure changes.
 */
const tableColumns = {
  initials: 0,
  surname: 1,
  surnamePrefix: 2,
  postalCode: 3,
  houseNumber: 4,
  houseNumberExtension: 5,
};

/**
 * Mock class for router binding
 */
class CustomerDetailMockComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let customerServiceMock: any;

  /**
   * Declare separate function to setup the customer service mock
   *
   * This way, we can introduce changes to function return values
   * or simulate errors without having to change the beforeEach
   * for individual tests.
   */
  const setupCustomerServiceMock = () => {
    customerServiceMock.getCustomers.and.returnValue(
      of(customerServiceMockResponse)
    );

    customerServiceMock.searchCustomers.and.callFake((searchTerm: string) => {
      const filteredCustomers = customerServiceMockResponse.filter(
        (customer) =>
          customer.surname.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
          -1
      );

      return of(filteredCustomers);
    });
  };

  beforeEach(async () => {
    customerServiceMock = jasmine.createSpyObj('CustomerService', [
      'getCustomers',
      'searchCustomers',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'customer/:customerId',
            component: CustomerDetailMockComponent,
          },
        ]),
      ],
      providers: [
        {
          provide: CustomerService,
          useValue: customerServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows correct data in the table after component is initialized', () => {
    setupCustomerServiceMock();
    fixture.detectChanges();

    // Check if the data is correct
    // Calling property with ['customers'] instead of .customers
    // to circumvent the private accessor on the property
    expect(component['customers'].data.length).toBe(3);

    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(4); // 3 + header row

    const tableCells = tableRows[1].querySelectorAll('td');

    // Check if the table cells contain the correct data
    const response = customerServiceMockResponse[0];

    expect(tableCells[tableColumns.initials].innerText).toEqual(
      response.initials
    );
    expect(tableCells[tableColumns.surname].innerText).toEqual(
      response.surname
    );

    // Prefix is optional, autocasted by table to empty string
    expect(tableCells[tableColumns.surnamePrefix].innerText).toEqual(
      response.surnamePrefix ?? ''
    );
    expect(tableCells[tableColumns.postalCode].innerText).toEqual(
      response.postalCode
    );
    expect(tableCells[tableColumns.houseNumber].innerText).toEqual(
      response.houseNumber
    );
    expect(tableCells[tableColumns.houseNumberExtension].innerText).toEqual(
      response.houseNumberExtension ?? ''
    );
  });

  it('shows correct data in the table after searching', fakeAsync(() => {
    setupCustomerServiceMock();
    fixture.detectChanges();

    const searchInput = fixture.nativeElement.querySelector('input');
    searchInput.value = 'Wal';
    searchInput.dispatchEvent(new Event('input'));

    tick(500);

    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(2); // 1 + header row

    const tableCells = tableRows[1].querySelectorAll('td');
    const response = customerServiceMockResponse[1];

    expect(tableCells[tableColumns.initials].innerText).toEqual(
      response.initials
    );
    expect(tableCells[tableColumns.surname].innerText).toEqual(
      response.surname
    );

    // Prefix is optional, autocasted by table to empty string
    expect(tableCells[tableColumns.surnamePrefix].innerText).toEqual(
      response.surnamePrefix ?? ''
    );
    expect(tableCells[tableColumns.postalCode].innerText).toEqual(
      response.postalCode
    );
    expect(tableCells[tableColumns.houseNumber].innerText).toEqual(
      response.houseNumber
    );
    expect(tableCells[tableColumns.houseNumberExtension].innerText).toEqual(
      response.houseNumberExtension ?? ''
    );
  }));

  it('shows all customers again after clearing the search', fakeAsync(() => {
    setupCustomerServiceMock();

    fixture.detectChanges();

    const searchInput = fixture.nativeElement.querySelector('input');
    searchInput.value = 'Wal';
    searchInput.dispatchEvent(new Event('input'));

    tick(500);

    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(2); // 1 + header row

    searchInput.value = null;
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(500);
    const tableRowsAfterClear = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRowsAfterClear.length).toBe(4); // 3 + header row
  }));

  it('changes table order when clicking on a column header', fakeAsync(() => {
    setupCustomerServiceMock();
    fixture.detectChanges();

    const tableHeaders = fixture.nativeElement.querySelectorAll('th');

    tableHeaders[tableColumns.postalCode].click();

    tick(500);

    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    const tableCells = tableRows[1].querySelectorAll('td');

    const response = customerServiceMockResponse[1];

    expect(tableCells[tableColumns.initials].innerText).toEqual(
      response.initials
    );
    expect(tableCells[tableColumns.surname].innerText).toEqual(
      response.surname
    );

    // Prefix is optional, autocasted by table to empty string
    expect(tableCells[tableColumns.surnamePrefix].innerText).toEqual(
      response.surnamePrefix ?? ''
    );
    expect(tableCells[tableColumns.postalCode].innerText).toEqual(
      response.postalCode
    );
    expect(tableCells[tableColumns.houseNumber].innerText).toEqual(
      response.houseNumber
    );
    expect(tableCells[tableColumns.houseNumberExtension].innerText).toEqual(
      response.houseNumberExtension ?? ''
    );
  }));

  it('navigates to the customer detail page when a row is clicked', fakeAsync(() => {
    setupCustomerServiceMock();
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    tableRows[1].click();

    tick(500);

    fixture.detectChanges();

    expect(router.url).toBe(`/customer/${customerServiceMockResponse[0].id}`);
  }));

  it('handles errors from the customer service', fakeAsync(() => {
    // Spy the alert() function to prevent it from showing
    spyOn(window, 'alert');

    // Setup the mock to return an error
    customerServiceMock.getCustomers.and.returnValue(
      throwError(() => new Error('Something went wrong'))
    );

    fixture.detectChanges();
    expect(component['customers'].data.length).toBe(0);

    expect(window.alert).toHaveBeenCalledWith(
      'An error occurred while retrieving the customers.'
    );
  }));
});
