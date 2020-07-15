import React, { Component } from "react";
import DataService from "../services/data.service";

import Form from "./expense-form.component";
import SuccessMessage from "./success-message.component";

export default class CreateExpense extends Component {
  constructor(props) {
    super(props);

    this.createExpense = this.createExpense.bind(this);
    this.newExpense = this.newExpense.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",
      initialValue: 0,
      created: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  createExpense() {
    var data = {
      name: this.state.name,
      description: this.state.description
    };

    DataService.createExpense(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
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
      initialValue: 0,
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
            onChangeInitialValue={this.onChangeInitialValue}
            onConfirmClick={this.onConfirmClick}
            name={this.state.name}
            description={this.state.description}
            initialValue={this.state.initialValue}
            />
        )}
      </div>
    );
  }
}
