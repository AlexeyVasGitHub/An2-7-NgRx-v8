import {Action, createReducer, on} from '@ngrx/store';
import {initialTasksState, TasksState} from './tasks.state';
import * as TasksActions from './tasks.actions';

const reducer = createReducer(
  initialTasksState,
  on(TasksActions.getTasks, state => {
    console.log('GET_TASKS action being handled!');
    return {...state};
  }),
  on(TasksActions.getTask, state => {
    console.log('GET_TASK action being handled!');
    return {...state};
  }),
  on(TasksActions.createTask, state => {
    console.log('CREATE_TASK action being handled!');
    return {...state};
  }),
  on(TasksActions.updateTask, state => {
    console.log('UPDATE_TASK action being handled!');
    return {...state};
  }),
  on(TasksActions.completeTask, state => {
    console.log('COMPLETE_TASK action being handled!');
    return {...state};
  }),
  on(TasksActions.deleteTask, state => {
    console.log('DELETE_TASK action being handled!');
    return {...state};
  })
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}
