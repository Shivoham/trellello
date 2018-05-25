import React, { Component } from 'react';
import Card from './card';
import NewCard from './new-card';
import uuid from 'uuid';
import _ from 'lodash';
import { connect } from 'react-redux';
import { removeColumn, editColumn } from '../actions/columns';
import { fetchCards } from '../actions/cards';

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
    this.removeCard    = this.removeCard.bind(this);
    this.removeColumn  = this.removeColumn.bind(this);
  }

  componentDidMount() {
    this.props.fetchCards(this.props.id);
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
    this.props.editColumn(this.props.id, { name: this.state.name });
  }

  removeCard(card) {
    this.setState({cards: this.state.cards.filter(currentCard => {
      return currentCard.id !== card.id;
    })})
  }

  removeColumn(event) {
    event.preventDefault();
    this.props.removeColumn(this.props.id);
  }

  renderTitle() {
    if (this.state.editing) {
      return (
        <div>
          <form onSubmit={this.submitColumn}>
            <input
              autoFocus={true}
              value={this.state.name}
              onChange={this.onInputChange}
              onFocus={(event) => event.target.select()}
              type="text"
              className="form-control"
              placeholder="Add a list" />
          </form>
          <a href="#" onClick={this.removeColumn}>Remove column</a>
        </div>
      );
    }

    return (
      <h5 className="card-title align-top" onClick={this.enableEdition}>
        {this.props.column.name}
      </h5>
    );
  }

  render() {
    const cards = _.map(this.props.cards, (card, id) => {
      return (
        <Card
          key={id}
          id={id}
          columnId={this.props.id}
          removeCard={this.removeCard}
          editCard={this.props.editCard}
          card={card} />
      );
    });

    return (
      <div className="column">
        { this.renderTitle() }
        { cards }
        <NewCard
          column={this.props.column}
          columnId={this.props.id}
        / >
      </div>
    );
  }
}

function mapStateToProps({cards}, ownProps) {
  return { cards: cards[ownProps.id] };
}

export default connect(mapStateToProps, { removeColumn, editColumn, fetchCards })(Column);
