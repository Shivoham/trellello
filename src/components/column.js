import React, { Component } from 'react';

class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.col.name
    };

    this.enableEdition  = this.enableEdition.bind(this);
    this.disableEdition = this.disableEdition.bind(this);
    this.onInputChange  = this.onInputChange.bind(this);
    this.submitColumn   = this.submitColumn.bind(this);
  }

  enableEdition(event) {
    event.preventDefault();
    this.props.setEditedColumn(this.props.col);
  }

  disableEdition(event) {
    event.preventDefault();
    this.props.setEditedColumn(null);
  }

  onInputChange(event) {
    this.setState({name: event.target.value});
  }

  submitColumn(event) {
    event.preventDefault();
    if (!this.state.name) {
      return;
    }

    this.setState({name: this.state.name});
    this.props.setEditedColumn(null);
  }

  render() {
    if (this.props.editing) {
      return (
        <div className="card" style={{width: '14rem'}}>
          <div className="card-body">
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
          </div>
        </div>
      );
    }

    return(
      <div className="card" style={{width: '14rem'}}>
        <div className="card-body">
          <h5 className="card-title" onClick={this.enableEdition}>{this.state.name}</h5>
        </div>
      </div>
    );
  }
}

export default Column;
