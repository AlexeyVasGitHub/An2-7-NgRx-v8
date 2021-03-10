import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';

// rxjs
import { takeUntil } from 'rxjs/operators';
import { TaskModel } from '../../models/task.model';
import { TaskPromiseService } from '../../services';
import { Subject } from 'rxjs';
import { AppState, TasksState } from '../../../core/@ngrx';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: TaskModel;
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private taskPromiseService: TaskPromiseService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.task = new TaskModel();

    let observer: any = {
      next: (tasksState: TasksState) => {
        this.task = {...tasksState.selectedTask} as TaskModel;
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('Stream is completed');
      }
    };

    this.store.select('tasks')
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);

    observer = {
      ...observer,
      next: (params: ParamMap) => {
        const id = params.get('taskID');
        if (id) {
          this.store.dispatch(TasksActions.getTask({taskID: +id}));
        }
      }
    };

    this.route.paramMap.subscribe(observer);

  }

  onSaveTask() {
    const task = {...this.task} as TaskModel;

    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.onGoBack())
      .catch(err => console.log(err));
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
