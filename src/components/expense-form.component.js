import React, { Component } from "react";

export default class ExpenseForm extends Component {
    constructor(props) {
      super(props);

      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeAmount = this.onChangeAmount.bind(this);
      this.handleFormConfirmation = this.handleFormConfirmation.bind(this);
    };

    onChangeName(e) {
        this.props.onChangeName(e.target.value);
    }

    onChangeDescription(e) {
        this.props.onChangeDescription(e.target.value);
    }

    onChangeAmount(e) {
        this.props.onChangeAmount(e.target.value);
    }

    handleFormConfirmation(e) {
        this.props.onConfirmClick();
    };

    render() {
        const name = this.props.name;
        const description = this.props.description;
        const amount = this.props.amount;

        return (<div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                onChange={this.onChangeName}
                value={name}
                name="name"
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                required
                onChange={this.onChangeDescription}
                value={description}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="init-value">Initial amount</label>
              <br />
              <input 
                type="number" 
                id="init-amount" 
                name="init-amount"
                min="0"
                onChange={this.onChangeAmount}
                value={amount}
                step="0.01"
                />
            </div>
    
            <button onClick={this.handleFormConfirmation} className="btn btn-success">
              Create
            </button>
          </div>);
    }
}
