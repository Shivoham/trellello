import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.card.name
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.enableEdition = this.enableEdition.bind(this);
    this.submitCard = this.submitCard.bind(this);
  }

  enableEdition(event) {
    event.preventDefault();
    this.props.setEditedCard(this.props.card);
  }

  onInputChange(event) {
    this.setState({name: event.target.value});
  }

  submitCard(event) {
    event.preventDefault();
    if (!this.state.name) {
      return;
    }

    this.props.setEditedCard(null);
  }

  render() {
    if (this.props.editing) {
      return (
        <div className="card">
          <div className="card-body">
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
          </div>
        </div>
      );
    }

    return (
      <div className="card">
        <div className="card-body" onClick={this.enableEdition}>
          <h6>{ this.state.name }</h6>
        </div>
      </div>
    );
  }
}

export default Card;
