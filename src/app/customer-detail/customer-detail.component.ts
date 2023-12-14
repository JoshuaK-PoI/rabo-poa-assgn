import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { CustomerService } from '../customer.service';
import { Customer } from '../models/customer.model';
@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
})
export class CustomerDetailComponent {
  @Input() private customerId: string = '';

  protected customer: Customer | null = null;

  protected customerForm = new FormGroup({
    initials: new FormControl(''),
    surnamePrefix: new FormControl(''),
    surname: new FormControl(''),
    sex: new FormControl(''),
    birthDate: new FormControl(''),
    streetName: new FormControl(''),
    postalCode: new FormControl(''),
    houseNumber: new FormControl(''),
    houseNumberExtension: new FormControl(''),
  });

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getCustomer(this.customerId).subscribe((customer) => {
      this.customer = customer;

      // This coincides with the @if check in the template.
      // To prevent unintended behavior, we should not set the form values
      // if the customer is null.
      if (customer) {
        this.customerForm.patchValue(customer);
      }
    });
  }
}
