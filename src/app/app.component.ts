import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  template: `
    <nav class="navbar navbar-expand-lg bg-primary-subtle mb-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Student & Orders Mini-System</a>
        <div class="collapse navbar-collapse show">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a
                routerLink="/students"
                class="nav-link"
                routerLinkActive="active"
                >Students</a
              >
            </li>
            <li class="nav-item">
              <a routerLink="/orders" class="nav-link" routerLinkActive="active"
                >Orders</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mb-5">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
