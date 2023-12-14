import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailComponent } from './customer-detail.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';
import { customerServiceMockResponse } from '../../datasource/test-customer-data-source';
import { Customer } from '../models/customer.model';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { of } from 'rxjs';

describe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;
  let customer = customerServiceMockResponse[0];
  let customerServiceMock: any;
  let router: Router;

  const setupCustomerServiceMock = () => {
    customerServiceMock.getCustomer.and.returnValue(of(customer));
  };

  beforeEach(async () => {
    customerServiceMock = jasmine.createSpyObj('CustomerService', [
      'getCustomer',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CustomerDetailComponent,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
        ]),
      ],
      providers: [
        {
          provide: CustomerService,
          useValue: customerServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDetailComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    setupCustomerServiceMock();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should receive customer details when provided with an ID', () => {
    setupCustomerServiceMock();

    // Provide customer ID input to component
    component['customerId'] = customer.id;

    fixture.detectChanges();

    expect(component['customer']).toEqual(customer);
  });

  it('should show customer details in the form', () => {
    setupCustomerServiceMock();

    // Provide customer ID input to component
    component['customerId'] = customer.id;

    fixture.detectChanges();
    // Omit the ID, this is not part of the form
    const customerWithoutId: Partial<Customer> = { ...customer };
    delete customerWithoutId.id;

    expect(component['customerForm'].value).toEqual(customerWithoutId);
  });

  it('should show a message when no customer is found', () => {
    customerServiceMock.getCustomer.and.returnValue(of(null));

    // Provide customer ID input to component
    component['customerId'] = 'invalid-id';

    fixture.detectChanges();

    const message = fixture.nativeElement.querySelector('p');
    expect(message.textContent).toContain('Customer not found');
  });

  it('routes to the home page when the back button is clicked', () => {
    setupCustomerServiceMock();

    const button = fixture.nativeElement.querySelector('a');
    button.click();

    fixture.detectChanges();
    expect(router.url).toEqual('/');
  });
});
