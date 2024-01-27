/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent  implements OnInit {
  todos: Todo[] = [];
  selectedTodo: Todo | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
  }

  updateTodoStatus(todo: Todo): void {
    todo._id && this.todoService.updateTodo(todo._id, todo).subscribe(() => {
      this.loadTodos();
    });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }

  showTodoDetails(todo: Todo): void {
    this.selectedTodo = todo;
  }
}