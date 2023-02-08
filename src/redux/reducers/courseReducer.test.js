import todoReducer from "./todoReducer";
import * as actions from "../actions/todoActions";

it("should add todo when passed CREATE_TODO_SUCCESS", () => {
  const initialState = [
    {
      title: "Dinner with mom"
    },
    {
      title: "Go to the gym"
    }
  ];

  const newTodo = {
    title: "Watch netflix"
  };

  const action = actions.createTodoSuccess(newTodo);

  const newState = todoReducer(initialState, action);

  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("Dinner with mom");
  expect(newState[1].title).toEqual("Go to the gym");
  expect(newState[2].title).toEqual("Watch netflix");
});

it("should update todo when passed UPDATE_TODO_SUCCESS", () => {

  const initialState = [
    { id: 1, title: "Dinner with mom" },
    { id: 2, title: "Go to the gym" },
    { id: 3, title: "Watch netflix" }
  ];

  const todo = { id: 2, title: "New Title" };
  const action = actions.updateTodoSuccess(todo);

  // act
  const newState = todoReducer(initialState, action);
  const updatedTodo = newState.find(a => a.id == todo.id);
  const untouchedTodo = newState.find(a => a.id == 1);

  // assert
  expect(updatedTodo.title).toEqual("New Title");
  expect(untouchedTodo.title).toEqual("Dinner with mom");
  expect(newState.length).toEqual(3);
});
