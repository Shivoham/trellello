import React, { Component } from 'react';
import Column from './column.js';
import NewColumn from './new-column.js';
import uuid from 'uuid';

class ColumnsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      editedColumn: null
    };

    this.addColumn       = this.addColumn.bind(this);
    this.renderColumns   = this.renderColumns.bind(this);
    this.setEditedColumn = this.setEditedColumn.bind(this);
  }

  componentDidMount() {
    this.setState({ columns: [
      { id: uuid.v1(), name: 'TODO' },
      { id: uuid.v1(), name: 'WIP' },
      { id: uuid.v1(), name: 'DONE' }
    ]})
  }

  addColumn(name) {
    this.setState({ columns: [ ...this.state.columns, {name: name, id: uuid.v1()} ]});
  }

  setEditedColumn(column) {
    this.setState({editedColumn: column});
  }

  renderColumns() {
    return this.state.columns.map(col => {
      return <Column
        key={col.id}
        col={col}
        editing={this.state.editedColumn !== null && col === this.state.editedColumn}
        setEditedColumn={this.setEditedColumn} />;
    });
  }

  render() {
    return (
      <div className="row">
        {this.renderColumns()}
        <NewColumn addColumn={this.addColumn} setEditedColumn={this.setEditedColumn} />
      </div>
    );
  }
}

export default ColumnsList;
