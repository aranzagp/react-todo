import * as types from "./actionTypes";
import * as todoApi from "../../api/todoApi";

export function createTodoSuccess(todo) {
  return { type: types.CREATE_TODO_SUCCESS, todo };
}

export function loadTodoSuccess(todos) {
  return { type: types.LOAD_TODOS_SUCCESS, todos };
}

export function updateTodoSuccess(todo) {
  return { type: types.UPDATE_TODO_SUCCESS, todo };
}

export function loadTodos() {
  return function(dispatch) {
    return todoApi
      .getTodos()
      .then(todos => {
        dispatch(loadTodoSuccess(todos));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveTodo(todo) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    return todoApi
      .saveTodo(todo)
      .then(savedTodo => {
        todo.id
          ? dispatch(updateTodoSuccess(savedTodo))
          : dispatch(createTodoSuccess(savedTodo));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteTodoOptimistic(todo) {
  return { type: types.DELETE_TODO_OPTIMISTIC, todo };
}

export function deleteTodo(todo) {
  return function(dispatch) {
    dispatch(deleteTodoOptimistic(todo));
    return todoApi.deleteTodo(todo.id);
  };
}
