/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent implements OnInit {
  todo!: Todo;

  constructor(private route: ActivatedRoute, private todoService: TodoService) {}

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
}
