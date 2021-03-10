import { Action, createReducer, on } from '@ngrx/store';
import { initialTasksState, TasksState } from './tasks.state';
import * as TasksActions from './tasks.actions';

const reducer = createReducer(
  initialTasksState,
  on(TasksActions.getTasks, state => {
    return {
      ...state,
      loading: true
    };
  }),
  on(TasksActions.getTask, state => {
    return {
      ...state,
      loading: true,
      loaded: false
    };

  }),
  on(TasksActions.createTask, state => {
    return {...state};
  }),
  on(TasksActions.updateTask, state => {
    return {...state};
  }),
  on(TasksActions.completeTask, (state, {task}) => {
    const id = task.id;
    const data = state.data.map(t => {
      if (t.id === id) {
        return {...task, done: true};
      }

      return t;
    });

    return {
      ...state,
      data
    };
  }),
  on(TasksActions.deleteTask, state => {
    return {...state};
  }),
  on(TasksActions.getTasksSuccess, (state, {tasks}) => {
    const data = [...tasks];
    return {
      ...state,
      data,
      loading: false,
      loaded: true
    };
  }),
  on(TasksActions.getTasksError, TasksActions.getTaskError, (state, {error}) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),
  on(TasksActions.getTaskSuccess, (state, {task}) => {
    const selectedTask = {...task};
    return {
      ...state,
      loading: false,
      loaded: true,
      selectedTask
    };
  }),
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}
