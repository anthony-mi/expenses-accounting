import React, { Component } from "react";
import DataService from "../services/data.service";

import Form from "./expense-form.component";
import SuccessMessage from "./success-message.component";

export default class CreateExpense extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.createExpense = this.createExpense.bind(this);
    this.newExpense = this.newExpense.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",
      amount: 0,
      created: false
    };
  }

  onChangeName(value) {
    this.setState({
      name: value
    });
  }

  onChangeDescription(value) {
    this.setState({
      description: value
    });
  }

  onChangeAmount(value) {
    this.setState({
      amount: value
    });
  }

  createExpense() {
    var data = {
      name: this.state.name,
      description: this.state.description,
      amount: Number(this.state.amount)
    };

    DataService.createExpense(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          amount: response.data.amount,
          created: true
        });
        console.log(`Expense creation response: ${response.data}`);
      })
      .catch(exception => {
        console.error(`Expense creation exception: ${exception}`);
      });
  }

  newExpense() {
    this.setState({
      id: null,
      name: '',
      description: '',
      amount: 0,
      created: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.created ? (
          <SuccessMessage onNewExpenseClick={this.newExpense} />
        ) : (
          <Form 
            onChangeName={this.onChangeName}
            onChangeDescription={this.onChangeDescription}
            onChangeAmount={this.onChangeAmount}
            onConfirmClick={this.createExpense}
            name={this.state.name}
            description={this.state.description}
            amount={this.state.amount}
            />
        )}
      </div>
    );
  }
}
