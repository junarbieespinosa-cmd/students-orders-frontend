import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Student } from '../models/student';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http
      .get<Student[]>(`${this.baseUrl}/students`)
      .pipe(catchError(this.handleError));
  }

  createStudent(payload: { name: string; grade: string; school: string }): Observable<Student> {
    return this.http
      .post<Student>(`${this.baseUrl}/students`, payload)
      .pipe(catchError(this.handleError));
  }

  getOrdersByStudent(studentId: number): Observable<Order[]> {
    const params = new HttpParams().set('studentId', studentId.toString());
    return this.http
      .get<Order[]>(`${this.baseUrl}/orders`, { params })
      .pipe(catchError(this.handleError));
  }

  createOrder(payload: { studentId: number; total: number; status: string }): Observable<Order> {
    return this.http
      .post<Order>(`${this.baseUrl}/orders`, payload)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error', error);
    let msg = 'An error occurred.';
    if (error.error?.message) {
      msg = error.error.message;
    } else if (error.status) {
      msg = `Request failed with status ${error.status}`;
    }
    return throwError(() => new Error(msg));
  }
}
