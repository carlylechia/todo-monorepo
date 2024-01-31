/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss'
})
export class EditTodoComponent implements OnInit {
  todo!: Todo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const todoId = params['id'];
      this.loadTodoDetails(todoId);
    });
  }

  loadTodoDetails(todoId: string): void {
    this.todoService.getTodoById(todoId).subscribe((todo) => {
      this.todo = todo;
    });
  }

  updateTodo(): void {
    if (this.todo) {
      this.todo._id && this.todoService.updateTodo(this.todo._id, this.todo).subscribe(() => {
        // Navigate back to todo details after updating
        this.router.navigate(['/todo', this.todo._id]);
      });
    }
  }
}
