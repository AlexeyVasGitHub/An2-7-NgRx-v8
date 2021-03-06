import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';
import { Task, TaskModel } from '../../models/task.model';
import { AppState } from '../../../core/@ngrx';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTasksData, selectTasksError } from '../../../core/@ngrx/tasks/tasks.selectors';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Promise<Array<TaskModel>>;
  tasks$: Observable<ReadonlyArray<Task>>;
  tasksError$: Observable<Error | string>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.tasks$ = this.store.select(selectTasksData);
    // this.tasks$ = this.store.select(selectTasksDataPartial, { count: 2});
    this.tasksError$ = this.store.select(selectTasksError);

    this.store.dispatch(TasksActions.getTasks());
  }

  onCreateTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  onCompleteTask(task: TaskModel): void {
    // task is not plain object
    // taskToComplete is a plain object
    const taskToComplete: Task = {...task, done: true};
    this.store.dispatch(TasksActions.completeTask({task: taskToComplete}));

  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onDeleteTask(task: TaskModel) {
    const taskToDelete: Task = {...task};
    this.store.dispatch(TasksActions.deleteTask({task: taskToDelete}));
  }
}
