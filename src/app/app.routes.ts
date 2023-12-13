import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'customer/:customerId', component: CustomerDetailComponent },
];
