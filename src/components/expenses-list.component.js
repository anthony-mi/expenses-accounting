import React, { Component } from "react";
import DataService from "../services/data.service";
import { Link } from "react-router-dom";

export default class ExpensesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchByName = this.onChangeSearchByName.bind(this);
    this.initializeExpenses = this.initializeExpenses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveExpense = this.setActiveExpense.bind(this);
    this.searchByName = this.searchByName.bind(this);

    this.state = {
      expenses: [],
      currentExpense: null,
      currentIndex: -1,
      searchingName: ""
    };
  }

  componentDidMount() {
    this.initializeExpenses();
  }

  onChangeSearchByName(e) {
    const searchingName = e.target.value;
    this.setState({
        searchingName: searchingName
    });
  }

  initializeExpenses() {
    DataService.getExpenses()
      .then(response => {
        this.setState({
          expenses: response.data
        });
        console.log(`'getExpenses()' response: ${response.data}`);
        console.log(response.data);
      })
      .catch(exception => {
        console.error(`'getExpenses()' exception: ${exception}`);
      });
  }

  refreshList() {
    this.initializeExpenses();
    this.setState({
      currentExpense: null,
      currentIndex: -1
    });
  }

  setActiveExpense(expense, index) {
    this.setState({
      currentExpense: expense,
      currentIndex: index
    });
  }

  searchByName() {
    DataService.getExpenseByName(this.state.searchingName)
      .then(response => {
        this.setState({
          expenses: response.data
        });
        console.log(`'searchByName(${this.state.searchingName})' response: ${response.data}`);
      })
      .catch(ex => {
        console.error(`'searchByName(${this.state.searchingName})' exception: ${ex}`);
      });
  }

  render() {
    const { searchingName, expenses, currentExpense, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchingName}
              onChange={this.onChangeSearchByName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchByName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Expenses</h4>

          <ul className="list-group">
            {expenses &&
                expenses.map((expense, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveExpense(expense, index)}
                  key={index}
                >
                  {expense.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentExpense ? (
            <div>
              <h4>Expense</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentExpense.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentExpense.description}
              </div>
              <div>
                <label>
                  <strong>Amount:</strong>
                </label>{" "}
                {currentExpense.amount}
              </div>

              <Link
                to={"/expenses/" + currentExpense.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a expense</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
