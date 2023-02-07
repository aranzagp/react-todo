import * as types from "../actions/actionTypes";

export default function todoReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_TODO:
      return [...state, { ...action.todo }];
    default:
      return state;
  }
}
