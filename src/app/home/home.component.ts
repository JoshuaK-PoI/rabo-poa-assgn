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
import { debounceTime } from 'rxjs';
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
export class HomeComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  protected customers: MatTableDataSource<Customer> =
    new MatTableDataSource<Customer>();

  protected total: number = 0;

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
    this.customerService.getCustomers().subscribe(({ customers, total }) => {
      this.customers.data = customers;
      this.total = total;
    });

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(({ searchTerm }) => {
        if (!searchTerm) {
          this.customerService
            .getCustomers()
            .subscribe(({ customers, total }) => {
              this.customers.data = customers;
              this.total = total;
            });
          return;
        }

        this.customerService
          .searchCustomers(searchTerm)
          .subscribe(({ customers, total }) => {
            this.customers.data = customers;
            this.total = total;
          });
      });
  }

  ngAfterViewInit() {
    this.customers.paginator = this.paginator;
    this.customers.sort = this.sort;
  }

  navigate(customerId: string) {
    this.router.navigate(['customer', customerId]);
  }
}
