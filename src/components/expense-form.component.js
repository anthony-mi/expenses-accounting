export default class ExpenseForm extends Component {
    constructor(props) {
      super(props);

      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeInitialValue = this.onChangeInitialValue.bind(this);
      this.handleFormConfirmation = this.handleFormConfirmation.bind(this);
    };

    onChangeName(e) {
        this.props.onChangeName(e.target.value);
    }

    onChangeDescription(e) {
        this.props.onChangeDescription(e.target.value);
    }

    onChangeInitialValue(e) {
        this.props.onChangeInitialValue(e.target.value);
    }

    handleFormConfirmation(e) {
        this.props.onConfirmClick();
    };

    render() {
        const name = this.props.name;
        const description = this.props.description;
        const initialValue = this.props.initialValue;

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
              <input
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
              <label htmlFor="init-value">Initial value</label>
              <input 
                type="number" 
                id="init-value" 
                name="init-value"
                min="0"
                onChange={this.onChangeInitialValue}
                value={initialValue}
                />
            </div>
    
            <button onClick={this.handleFormConfirmation} className="btn btn-success">
              Create
            </button>
          </div>);
    }
}
