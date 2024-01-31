import { Route } from '@angular/router';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodosComponent } from './todos/todos.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodosComponent },
  { path: 'todo/:id', component: TodoDetailComponent, },
  { path: 'todo/:id/edit', component: EditTodoComponent },
];
