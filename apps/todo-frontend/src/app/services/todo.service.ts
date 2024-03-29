import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly apiUrl = 'http://localhost:3333/api/todos';

  constructor(private http: HttpClient) {}

  // Get all todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // Get details of a single todo by ID
  getTodoById(id: string): Observable<Todo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Todo>(url);
  }

  // Add a new todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }
  
  // Toggle completion status
  toggleTodoStatus(todoId: string): Observable<Todo> {
    const url = `${this.apiUrl}/${todoId}/toggleStatus`;
    return this.http.patch<Todo>(url, {});
  }

  // Update a todo
  updateTodo(id: string, todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Todo>(url, todo);
  }

  // Delete a todo
  deleteTodo(id: string): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
