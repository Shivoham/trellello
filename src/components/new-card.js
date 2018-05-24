import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard } from '../actions/cards';

class NewCard extends Component {
  constructor(state) {
    super(state);

    this.state = {
      editing: false,
      name: null
    };

    this.enableEdition  = this.enableEdition.bind(this);
    this.disableEdition = this.disableEdition.bind(this);
    this.onInputChange  = this.onInputChange.bind(this);
    this.addCard        = this.addCard.bind(this);
  }

  enableEdition(event) {
    event.preventDefault();
    this.setState({editing: true});
  }

  disableEdition(event) {
    event.preventDefault();
    this.setState({editing: false});
  }

  addCard(event) {
    event.preventDefault();
    if (!this.state.name) {
      return;
    }

    this.props.addCard({name: this.state.name}, this.props.columnId);
    this.setState({name: null, editing: false});
  }

  onInputChange(event) {
    this.setState({name: event.target.value});
  }

  render() {
    if (this.state.editing) {
      return (
        <form onSubmit={this.addCard}>
          <input
            autoFocus={true}
            value={this.state.name}
            onChange={this.onInputChange}
            type="text"
            className="form-control"
            placeholder="Card name" />
          <button type="submit">Save</button>
          <a href="#" onClick={this.disableEdition}>Cancel</a>
        </form>
      );
    }

    return <a href="#" onClick={this.enableEdition}>Add a card</a>;
  }
}

export default connect(null, { addCard })(NewCard);
