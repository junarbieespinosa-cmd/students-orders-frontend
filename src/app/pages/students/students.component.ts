import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  error: string | null = null;

  newStudent = {
    name: '',
    grade: '',
    school: '',
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.error = null;
    this.api.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load students.';
        this.loading = false;
      },
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.loading = true;
    this.error = null;

    this.api.createStudent(this.newStudent).subscribe({
      next: (created) => {
        this.students.push(created);
        form.resetForm();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to create student.';
        this.loading = false;
      },
    });
  }
}
