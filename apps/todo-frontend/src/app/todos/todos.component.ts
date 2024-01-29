/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
// import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { ModalService } from '../edit-modal/edit-modal.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent  implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = { title: '', description: '', completed: false };
  selectedTodo: Todo | null = null;
  editedTodo: Todo = { title: '', description: '' };
  isEditModalOpen = false;

  constructor(private todoService: TodoService, private router: Router, private dialog: MatDialog, private modalService: ModalService) {}

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

  showTodoDetails(todoId: string): void {
    this.router.navigate(['/todo', todoId]);
  }

  openModal(modalTemplate: TemplateRef<unknown>) {
    this.modalService
      .open(modalTemplate, { size: 'lg', title: 'Foo' })
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }

  closeModal() {
    this.dialog.closeAll;
  }
}
