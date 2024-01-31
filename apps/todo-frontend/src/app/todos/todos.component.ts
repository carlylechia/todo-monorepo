/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent  implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = { title: '', description: '', completed: false };
  selectedTodo: Todo | null = null;

  constructor(private todoService: TodoService, private router: Router,) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
  }

  createNewTodo(): void {
    this.todoService.addTodo(this.newTodo).subscribe((createdTodo) => {
      this.todos.push(createdTodo);
      this.newTodo = { title: '', description: '', completed: false };
    });
  }

  updateTodoStatus(todo: Todo): void {
    todo._id && this.todoService.toggleTodoStatus(todo._id).subscribe((updatedTodo) => {
      // Update the local todos array with the toggled todo
      const index = this.todos.findIndex((t) => t._id === updatedTodo._id);
      if (index !== -1) {
        this.todos[index] = { ...updatedTodo };
      }
    });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }

  showTodoDetails(todoId: string): void {
    this.router.navigate(['/todo', todoId]);
  }
}
