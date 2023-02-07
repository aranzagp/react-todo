import React from "react";
import { connect } from "react-redux";
import * as todoActions from "../../redux/actions/todoActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import TodoList from "./TodoList";
import { Redirect } from "react-router-dom";

class TodosPage extends React.Component {
  state = {
    redirectToAddTodoPage: false
  };

  componentDidMount() {
    const { todos, actions } = this.props;

    if (todos.length === 0) {
      actions.loadTodos().catch(error => {
        alert("Loading todos failed" + error);
      });
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddTodoPage && <Redirect to="/todo" />}
        <h2>Todos</h2>

        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-todo"
          onClick={() => this.setState({ redirectToAddTodoPage: true })}
        >
          Add Todo
        </button>

        <TodoList todos={this.props.todos} />
      </>
    );
  }
}

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
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosPage);
