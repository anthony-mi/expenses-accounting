import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';

import CreateExpense from "./components/create-expense.component";
import Expense from "./components/expense.component";
import ExpensesList from "./components/expenses-list.component";
import CreateExpense from "./components/create-expense.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/expenses" className="navbar-brand">
              Expenses Accounting
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/expenses"} className="nav-link">
                  Expenses
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/create"} className="nav-link">
                  Create
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/expenses"]} component={ExpensesList} />
              <Route exact path="/create" component={CreateExpense} />
              <Route path="/expenses/:id" component={Expense} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
