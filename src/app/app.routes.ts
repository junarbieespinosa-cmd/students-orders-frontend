import { Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { OrdersComponent } from './pages/orders/orders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '**', redirectTo: 'students' },
];
