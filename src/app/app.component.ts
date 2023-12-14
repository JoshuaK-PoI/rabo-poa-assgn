import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CUSTOMER_DATA_SOURCE_TOKEN } from '../datasource/customer-data-source';
import { DevCustomerDataSource } from '../datasource/dev-customer-data-source';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [
    { provide: CUSTOMER_DATA_SOURCE_TOKEN, useClass: DevCustomerDataSource },
    CustomerService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected title = 'rabo-poa-assgn';
}
