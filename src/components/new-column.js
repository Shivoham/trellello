import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addColumn } from '../actions/columns';

class NewColumn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      editing: false
    };

    this.enableEdition  = this.enableEdition.bind(this);
    this.disableEdition = this.disableEdition.bind(this);
    this.onInputChange  = this.onInputChange.bind(this);
    this.addColumn      = this.addColumn.bind(this);
  }

  enableEdition(event) {
    event.preventDefault();
    this.setState({editing: true});
  }

  disableEdition(event) {
    event.preventDefault();
    this.setState({editing: false});
  }

  onInputChange(event) {
    this.setState({name: event.target.value});
  }

  addColumn(event) {
    event.preventDefault();
    if (!this.state.name) {
      return;
    }

    this.props.addColumn(this.state.name);
    this.setState({name: null, editing: false});
  }

  renderTitle() {
    if (this.state.editing) {
      return (
        <form onSubmit={this.addColumn}>
          <input
            autoFocus={true}
            value={this.state.name}
            onChange={this.onInputChange}
            type="text"
            className="form-control"
            placeholder="Add a list" />
          <button type="submit">Save</button>
          <a href="#" onClick={this.disableEdition}>Cancel</a>
        </form>
      );
    }

    return <h5><a href="#" onClick={this.enableEdition}>Add a list</a></h5>;
  }

  render() {
    return(
      <div className="column">
        { this.renderTitle() }
      </div>
    );
  }
}

export default connect(null, { addColumn })(NewColumn);
