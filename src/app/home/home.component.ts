import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/customer.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription, debounceTime, take } from 'rxjs';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CUSTOMER_DATA_SOURCE_TOKEN } from '../../datasource/customer-data-source';
import { DevCustomerDataSource } from '../../datasource/dev-customer-data-source';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public customers: MatTableDataSource<Customer> =
    new MatTableDataSource<Customer>();

  public total: number = 0;
  protected subscriptions: Subscription[] = [];

  protected displayedColumns: string[] = [
    'initials',
    'surname',
    'surnamePrefix',
    'postalCode',
    'houseNumber',
    'houseNumberExtension',
  ];
  protected searchForm = new FormGroup({
    searchTerm: new FormControl(''),
  });

  ngOnInit() {
    this.customerService
      .getCustomers()
      .pipe(take(1))
      .subscribe({
        next: ({ customers, total }) => {
          this.customers.data = customers;
          this.total = total;
        },
        error: (error) => {
          console.error(error);
          this.customers.data = [];
          this.total = 0;
        },
      });

    this.subscriptions.push(
      this.searchForm.valueChanges
        .pipe(debounceTime(500))
        .subscribe(({ searchTerm }) => {
          if (!searchTerm) {
            this.customerService.getCustomers().subscribe({
              next: ({ customers, total }) => {
                this.customers.data = customers;
                this.total = total;
              },

              error: (error) => {
                console.error(error);
                this.customers.data = [];
                this.total = 0;
              },
            });
            return;
          }

          this.customerService
            .searchCustomers(searchTerm)
            .pipe(take(1))
            .subscribe({
              next: ({ customers, total }) => {
                this.customers.data = customers;
                this.total = total;
              },

              error: (error) => {
                console.error(error);
                this.customers.data = [];
                this.total = 0;
              },
            });
        })
    );
  }

  ngAfterViewInit() {
    this.customers.paginator = this.paginator;
    this.customers.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  navigate(customerId: string) {
    this.router.navigate(['customer', customerId]);
  }
}
