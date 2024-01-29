import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodosComponent } from './todos/todos.component';

@Component({
  standalone: true,
  imports: [RouterModule, TodosComponent],
  selector: 'todo-monorepo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todo-frontend';
}
