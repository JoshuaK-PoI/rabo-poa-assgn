import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailComponent } from './customer-detail.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';
import { customerServiceMockResponse } from '../app.component.spec';
import { Customer } from '../models/customer.model';
import { Router } from '@angular/router';

describe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;
  let customer = customerServiceMockResponse[0];
  let customerServiceMock: any;
  let router: Router;

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
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDetailComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should receive customer details when provided with an ID', () => {
    // Provide customer ID input to component
    component['customerId'] = customer.id;

    customerServiceMock.getCustomer.and.returnValue(customer);
    fixture.detectChanges();

    expect(component['customer']).toEqual(customer);
  });

  it('should show customer details in the form', () => {
    // Provide customer ID input to component
    component['customerId'] = customer.id;

    customerServiceMock.getCustomer.and.returnValue(customer);
    fixture.detectChanges();
    // Omit the ID, this is not part of the form
    const customerWithoutId: Partial<Customer> = { ...customer };
    delete customerWithoutId.id;

    expect(component['customerForm'].value).toEqual(customerWithoutId);
  });

  it('should show a message when no customer is found', () => {
    // Provide customer ID input to component
    component['customerId'] = 'invalid-id';

    customerServiceMock.getCustomer.and.returnValue(null);
    fixture.detectChanges();

    const message = fixture.nativeElement.querySelector('p');
    expect(message.textContent).toContain('Customer not found');
  });

  it('routes to the home page when the back button is clicked', () => {
    const button = fixture.nativeElement.querySelector('a');
    button.click();

    fixture.detectChanges();
    expect(router.url).toEqual('/');
  });
});
