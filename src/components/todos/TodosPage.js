import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as todoActions from "../../redux/actions/todoActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import TodoList from "./TodoList";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const TodosPage = (props) => {
  const [redirectToAddTodoPage, setRedirectToAddTodoPage] = useState(false);

  useEffect(() => {
    const { todos, actions } = props;

    if (todos.length === 0) {
      actions.loadTodos().catch(error => {
        alert("Loading todos failed" + error);
      });
    }
  }, []);

  const handleDeleteTodo = async todo => {
    toast.error("Todo deleted");
    try {
      await props.actions.deleteTodo(todo);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      {redirectToAddTodoPage && <Redirect to="/todo" />}
      <h2>Todos</h2>

      <button
        style={{ marginBottom: 20 }}
        className="btn btn-primary add-todo"
        onClick={() => setRedirectToAddTodoPage(true)}
      >
        Add Todo
      </button>

      <TodoList onDeleteClick={handleDeleteTodo} todos={props.todos} />
    </>
  );
};

TodosPage.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTodos: bindActionCreators(todoActions.loadTodos, dispatch),
      deleteTodo: bindActionCreators(todoActions.deleteTodo, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosPage);
