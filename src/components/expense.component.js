import React, { Component } from "react";
import DataService from "../services/data.service";

export default class Expense extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.getExpense = this.getExpense.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);

    this.state = {
      currentExpense: {
        id: null,
        name: "",
        description: "",
        amount: 0
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getExpense(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;
    this.setState(function(prevState) {
      return {
        currentExpense: {
          ...prevState.currentExpense,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    this.setState(prevState => ({
        currentExpense: {
        ...prevState.currentExpense,
        description: description
      }
    }));
  }

  onChangeAmount(e) {
    const amount = e.target.value;
    this.setState(prevState => ({
        currentExpense: {
        ...prevState.currentExpense,
        amount: amount
      }
    }));
  }

  getExpense(id) {
    DataService.getExpenseById(id)
      .then(response => {
        this.setState({
          currentExpense: response.data
        });
        console.log(`'getExpenseById(${id})' response: ${response.data}`);
      })
      .catch(ex => {
        console.error(`'getExpenseById(${id})' exception: ${ex}`);
      });
  }

  updateExpense() {
    DataService.updateExpense(
      this.state.currentExpense.id,
      this.state.currentExpense
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The expense was updated successfully!"
        });
      })
      .catch(ex => {
        console.error(`'updateExpense()' exception: ${ex}`);
      });
  }

  deleteExpense() {    
    DataService.deleteExpense(this.state.currentExpense.id)
      .then(response => {
        console.log(`'deleteExpense()' response: ${response.data}`);
        this.props.history.push('/expeses')
      })
      .catch(ex => {
        console.log(`'deleteExpense()' exception: ${ex}`);
      });
  }

  render() {
    const { currentExpense } = this.state;

    return (
      <div>
        {currentExpense ? (
          <div className="edit-form">
            <h4>Expense</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentExpense.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentExpense.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <br/>
                <input 
                    type="number" 
                    id="amount" 
                    name="amount"
                    min="0"
                    onChange={this.onChangeAmount}
                    value={currentExpense.amount}
                    step="0.01"
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteExpense}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateExpense}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a expense</p>
          </div>
        )}
      </div>
    );
  }
}
