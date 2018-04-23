import React, { Component } from 'react';

class NewColumn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };

    this.enableEdition  = this.enableEdition.bind(this);
    this.disableEdition = this.disableEdition.bind(this);
    this.onInputChange  = this.onInputChange.bind(this);
    this.addColumn   = this.addColumn.bind(this);
  }

  enableEdition(event) {
    event.preventDefault();
    this.setState({editing: true});
    this.props.setEditedColumn(null);
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
    this.setState({name: '', editing: false});
  }

  render() {
    if (this.state.editing) {
      return (
        <div className="card" style={{width: '14rem'}}>
          <div className="card-body">
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
          </div>
        </div>
      );
    }

    return(
      <div className="card border-light" style={{width: '14rem'}}>
        <div className="card-body">
          <h5><a href="#" onClick={this.enableEdition}>Add a list</a></h5>
        </div>
      </div>
    );
  }
}

export default NewColumn;
