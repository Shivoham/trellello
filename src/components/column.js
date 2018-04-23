import React, { Component } from 'react';
import Card from './card';

class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.column.name,
      cards: props.column.cards,
      editedCard: null
    };

    this.enableEdition  = this.enableEdition.bind(this);
    this.onInputChange  = this.onInputChange.bind(this);
    this.submitColumn   = this.submitColumn.bind(this);
    this.setEditedCard   = this.setEditedCard.bind(this);
  }

  enableEdition(event) {
    event.preventDefault();
    this.props.setEditedColumn(this.props.column);
  }

  onInputChange(event) {
    this.setState({name: event.target.value});
  }

  submitColumn(event) {
    event.preventDefault();
    if (!this.state.name) {
      return;
    }

    this.props.setEditedColumn(null);
  }

  setEditedCard(card) {
    this.setState({editedCard: card});
  }

  renderTitle() {
    if (this.props.editing) {
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

    return <h5 className="card-title align-top" onClick={this.enableEdition}>{this.state.name}</h5>;
  }

  render() {
    let cards = this.state.cards.map(card => {
      return (
        <Card
          editing={card === this.state.editedCard}
          setEditedCard={this.setEditedCard}
          key={card.id}
          card={card} />
      );
    });

    return (
      <div className="col">
        { this.renderTitle() }
        { cards }
        <a href="#">Add a card</a>
      </div>
    );
  }
}

export default Column;
