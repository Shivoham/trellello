import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.card.name,
      editing: false
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.enableEdition = this.enableEdition.bind(this);
    this.submitCard    = this.submitCard.bind(this);
    this.removeCard    = this.removeCard.bind(this);
  }

  enableEdition(event) {
    event.preventDefault();
    this.setState({editing: true});
  }

  onInputChange(event) {
    this.setState({name: event.target.value});
  }

  submitCard(event) {
    event.preventDefault();
    if (!this.state.name) {
      return;
    }

    this.setState({editing: false});
    this.props.editCard(this.state.name, this.props.card)
  }

  removeCard(event) {
    event.preventDefault();
    this.props.removeCard(this.props.card);
  }

  renderContent() {
    if (this.state.editing) {
      return (
        <form onSubmit={this.submitCard}>
          <input
            autoFocus={true}
            value={this.state.name}
            onChange={this.onInputChange}
            onBlur={this.submitCard}
            onFocus={(event) => event.target.select()}
            type="text"
            className="form-control" />
        </form>
      );
    }

    return <h6 onClick={this.enableEdition}>{ this.props.card.name }</h6>;
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          {this.renderContent()}
          <a href="#" onClick={this.removeCard}>Remove card</a>
        </div>
      </div>
    );
  }
}

export default Card;
