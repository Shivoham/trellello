import React, { Component } from 'react';
import Card from './card';
import NewCard from './new-card';
import uuid from 'uuid';

class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.column.name,
      cards: props.column.cards,
      editing: false
    };

    this.enableEdition = this.enableEdition.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.submitColumn  = this.submitColumn.bind(this);
    this.addCard       = this.addCard.bind(this);
    this.removeCard    = this.removeCard.bind(this);
  }

  enableEdition(event) {
    event.preventDefault();
    this.setState({editing: true});
  }

  onInputChange(event) {
    this.setState({name: event.target.value});
  }

  submitColumn(event) {
    event.preventDefault();
    if (!this.state.name) {
      return;
    }

    this.setState({editing: false});
  }

  addCard(cardName) {
    this.setState({cards: [
      ...this.state.cards,
      { id: uuid.v1(), name: cardName }
    ]});
  }

  removeCard(card) {
    this.setState({cards: this.state.cards.filter(currentCard => {
      return currentCard.id !== card.id;
    })})
  }

  renderTitle() {
    if (this.state.editing) {
      return (
        <form onSubmit={this.submitColumn}>
          <input
            autoFocus={true}
            value={this.state.name}
            onChange={this.onInputChange}
            onBlur={this.submitColumn}
            onFocus={(event) => event.target.select()}
            type="text"
            className="form-control"
            placeholder="Add a list" />
        </form>
      );
    }

    return (
      <h5 className="card-title align-top" onClick={this.enableEdition}>
        {this.state.name}
      </h5>
    );
  }

  render() {
    const cards = this.state.cards.map(card => {
      return (
        <Card
          key={card.id}
          removeCard={this.removeCard}
          card={card} />
      );
    });

    return (
      <div className="column">
        { this.renderTitle() }
        { cards }
        <NewCard
          addCard={this.addCard} />
      </div>
    );
  }
}

export default Column;
