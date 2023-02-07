import React from "react";
import { connect } from "react-redux";
import * as todoActions from "../../redux/actions/todoActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class TodosPage extends React.Component {
  state = {
    todo: {
      title: ""
    }
  };

  handleChange = event => {
    const todo = { ...this.state.todo, title: event.target.value };
    this.setState({ todo });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.actions.createTodo(this.state.todo);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Todos</h2>
        <h3>Add Todo</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.todo.title}
        />

        <input type="submit" value="Save" />
        {this.props.todos.map(todo => (
          <div key={todo.title}>{todo.title}</div>
        ))}
      </form>
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
    actions: bindActionCreators(todoActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosPage);
