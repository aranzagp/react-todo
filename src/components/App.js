import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import TodosPage from "./todos/TodosPage";
import ManageTodoPage from "./todos/ManageTodoPage";


function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/todos" component={TodosPage} />
        <Route path="/todo/:slug" component={ManageTodoPage} />
        <Route path="/todo" component={ManageTodoPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
