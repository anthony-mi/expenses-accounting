export default class SuccessMessage extends Component {
    constructor(props) {
      super(props);
      this.handleNewExpense = this.handleNewExpense.bind(this);
    }

    handleNewExpense(e) {
        this.props.onNewExpenseClick();
    }

    render() {
        return (
            <div>
                <h4>Expense created successfully!</h4>
                <button className="btn btn-success" onClick={this.handleNewExpense}>
                  Create new
                </button>
            </div>);
    }
}
