import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTodos, saveTodo } from "../../redux/actions/todoActions";
import PropTypes from "prop-types";
import TodoForm from "./TodoForm";
import { newTodo } from "../../../tools/mockData";

function ManageTodoPage({
  todos,
  loadTodos,
  saveTodo,
  history,
  ...props
}) {
  const [todo, setTodo] = useState({ ...props.todo });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (todos.length === 0) {
      loadTodos().catch(error => {
        alert("Loading todos failed" + error);
      });
    } else {
      setTodo({ ...props.todo });
    }
  }, [props.todo]);

  function handleChange(event) {
    const { name, value } = event.target;
    setTodo(prevTodo => ({
      ...prevTodo,
      [name]: value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveTodo(todo).then(() => {
      history.push("/todos");
    });
  }

  return (
    <TodoForm
      todo={todo}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageTodoPage.propTypes = {
  todo: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired,
  loadTodos: PropTypes.func.isRequired,
  saveTodo: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getTodoBySlug(todos, slug) {
  return todos.find(todo => todo.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const todo =
    slug && state.todos.length > 0
      ? getTodoBySlug(state.todos, slug)
      : newTodo;
  return {
    todo,
    todos: state.todos
  };
}

const mapDispatchToProps = {
  loadTodos,
  saveTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageTodoPage);
