import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskPromiseService } from '../../../tasks';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { pluck, switchMap } from 'rxjs/operators';
import * as TasksActions from './tasks.actions';

@Injectable()
export class TasksEffects {


  constructor(private actions$: Actions,
              private taskPromiseService: TaskPromiseService) {
    console.log('[TASKS EFFECTS]');
  }

  getTasks$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.getTasks),
      switchMap(action =>
        // Notice!
        // If you have a connection to the Firebase,
        // the stream will be infinite - you have to unsibscribe
        // This can be performed following this pattern
        // this.taskObservableService
        //      .getTasks()
        //      .pipe(takeUntil(this.actions$.pipe(ofType(TasksActions.TaskListComponentIsDestroyed))
        // If you use HttpClient, the stream is finite,
        // so you have no needs to unsibscribe
        this.taskPromiseService
          .getTasks()
          .then(tasks => TasksActions.getTasksSuccess({tasks}))
          .catch(error => TasksActions.getTasksError({error}))
      )
    )
  );

  getTask$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.getTask),
      pluck('taskID'),
      switchMap(taskID =>
        this.taskPromiseService
          .getTask(taskID)
          .then(task => TasksActions.getTaskSuccess({task}))
          .catch(error => TasksActions.getTaskError({error}))
      )
    )
  );

}