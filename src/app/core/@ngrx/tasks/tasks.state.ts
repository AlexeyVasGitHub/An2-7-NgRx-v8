import { Task, TaskModel } from '../../../tasks/models/task.model';
export interface TasksState {
  data: ReadonlyArray<Task>;
}

export interface TasksState {
  data: ReadonlyArray<Task>;
  selectedTask: Readonly<Task>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}


export const initialTasksState: TasksState = {
  data: [
    new TaskModel(1, 'Estimate', 1, 8, 8, true),
    new TaskModel(2, 'Create', 2, 8, 4, false),
    new TaskModel(3, 'Deploy', 3, 8, 0, false)
  ],
  selectedTask: null,
  loading: false,
  loaded: false,
  error: null
};

