import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TodoList = ({ todos }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Description</th>
        <th>Done</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => {
        return (
          <tr key={todo.id}>
            <td>
              <a
                className="btn btn-light"
                href={"" + todo.slug}
              >
                See details
              </a>
            </td>
            <td>
              <Link to={"/todo/" + todo.slug}>{todo.title}</Link>
            </td>
            <td>{todo.description}</td>
            <td>{todo.done ? "true" : "false"}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

export default TodoList;
