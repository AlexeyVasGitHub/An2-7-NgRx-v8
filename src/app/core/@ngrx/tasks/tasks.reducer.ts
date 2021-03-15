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

  on(TasksActions.deleteTask, state => {
    return {...state};
  }),

  on(TasksActions.getTasksSuccess, (state, {tasks}) => {
    const data = [...tasks];
    return {
      ...state,
      data,
      loading: false,
      loaded: true,
      selectedTask: null
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
      selectedTask,
    };
  }),

  on(TasksActions.updateTaskSuccess, (state, {task}) => {
    const data = [...state.data];

    const index = data.findIndex(t => t.id === task.id);

    data[index] = {...task};

    return {
      ...state,
      data
    };
  }),

  on(
    TasksActions.createTaskError,
    TasksActions.updateTaskError,
    TasksActions.deleteTaskError,
    (state, {error}) => {
    return {
      ...state,
      error
    };
  }),

  on(TasksActions.createTaskSuccess, (state, { task }) => {
    const data = [...state.data, { ...task }];

    return {
      ...state,
      data
    };
  }),

  on(TasksActions.deleteTaskSuccess, (state, { task }) => {
    const data = state.data.filter(t => t.id !== task.id);

    return {
      ...state,
      data
    };
  }),

);

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}
