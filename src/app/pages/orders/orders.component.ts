import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Student } from "../../models/student";
import { Order, OrderStatus } from "../../models/order";

@Component({
  selector: "app-orders",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  students: Student[] = [];
  selectedStudentId: number | null = null;

  orders: Order[] = [];

  loadingStudents = false;
  loadingOrders = false;
  savingOrder = false;
  error: string | null = null;

  newOrder = {
    total: 0,
    status: "pending" as OrderStatus,
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loadingStudents = true;
    this.error = null;
    this.api.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.loadingStudents = false;
      },
      error: (err) => {
        console.log(` ----- here ${err.message}`);
        //this.error = "Failed to load students.";
        this.error = err.message || "Failed to load students.";
        this.loadingStudents = false;
      },
    });
  }

  onSelectStudent(): void {
    if (this.selectedStudentId == null) {
      this.orders = [];
      return;
    }
    this.loadOrders(this.selectedStudentId);
  }

  loadOrders(studentId: number): void {
    this.loadingOrders = true;
    this.error = null;
    this.api.getOrdersByStudent(studentId).subscribe({
      next: (data) => {
        this.orders = data;
        this.loadingOrders = false;
      },
      error: (err) => {
        this.error = err.message || "Failed to load orders.";
        this.loadingOrders = false;
      },
    });
  }

  onSubmitOrder(form: NgForm): void {
    if (!this.selectedStudentId || form.invalid) return;

    this.savingOrder = true;
    this.error = null;

    const payload = {
      studentId: this.selectedStudentId,
      total: this.newOrder.total,
      status: this.newOrder.status,
    };

    this.api.createOrder(payload).subscribe({
      next: (created) => {
        this.orders.push(created);
        form.resetForm({ status: "pending", total: 0 });
        this.savingOrder = false;
      },
      error: (err) => {
        this.error = err.message || "Failed to create order.";
        this.savingOrder = false;
      },
    });
  }
}
