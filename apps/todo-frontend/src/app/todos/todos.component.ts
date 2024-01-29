/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent  implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = { title: '', description: '', completed: false };
  selectedTodo: Todo | null = null;
  editedTodo: Todo = { title: '', description: '' };
  isEditModalOpen = false;

  constructor(private todoService: TodoService) {}

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

  openEditModal(todo: Todo): void {
    console.log("MODAL OPEN!");
    this.editedTodo = { ...todo };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  submitEditedTodo(): void {
    // Call your service method to update the todo in the database
    this.editedTodo._id && this.todoService.updateTodo(this.editedTodo._id, this.editedTodo).subscribe(() => {
      // Update the local todos array with the edited todo
      const index = this.todos.findIndex((todo) => todo._id === this.editedTodo._id);
      if (index !== -1) {
        this.todos[index] = { ...this.editedTodo };
      }

      // Close the edit modal
      this.closeEditModal();
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

  showTodoDetails(todo: Todo): void {
    this.selectedTodo = todo;
  }
}