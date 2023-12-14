import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;

  protected customers = new MatTableDataSource<Customer>();

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

  private subscriptions: Subscription[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAll();
    this.initSearch();
  }

  ngAfterViewInit() {
    // Bind pagination and sorting to the data source.
    // Thanks to the use of Material, this is all that is needed.
    this.customers.paginator = this.paginator;
    this.customers.sort = this.sort;
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions to prevent memory leaks.
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  navigate(customerId: string) {
    // Router links cannot be bound to a table row, so we have to use a function.
    this.router.navigate(['customer', customerId]);
  }

  private getCustomerError(error: any): void {
    // Using an alert and console error to keep things simple.
    // In a real-world application,
    // the alert would be replaced with a snackbar or toast.
    // The console error may be sent to a logging service e.g. Sentry or Bugsnag.
    console.error(error);
    alert('An error occurred while retrieving the customers.');
    this.customers.data = [];
  }

  private getAll(): void {
    this.customerService
      .getCustomers()
      .pipe(take(1))
      .subscribe({
        next: (customers) => this.updateCustomers(customers),
        error: (error) => this.getCustomerError(error),
      });
  }

  private initSearch() {
    this.subscriptions.push(
      this.searchForm.valueChanges
        .pipe(debounceTime(500))
        .subscribe(({ searchTerm }) => {
          if (!searchTerm) {
            this.getAll();
            return;
          }

          this.customerService
            .searchCustomers(searchTerm)
            .pipe(take(1))
            .subscribe({
              next: (customers) => this.updateCustomers(customers),
              error: (error) => this.getCustomerError(error),
            });
        })
    );
  }

  private updateCustomers(customers: Customer[]): void {
    // This is a separate function to avoid having to change
    // every subscription to the customer service in case
    // more updates in the component are needed.
    this.customers.data = customers;
  }
}
