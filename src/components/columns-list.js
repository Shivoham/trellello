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
      { id: uuid.v1(), name: 'Todo', cards: [
        {
          id: uuid.v1(),
          name: "Mettre un slip propre"
        },
        {
          id: uuid.v1(),
          name: "Mettre un nouveau slip"
        },
        {
          id: uuid.v1(),
          name: "Acheter un slip de couleur"
        },
        {
          id: uuid.v1(),
          name: "Lorem ipsum dolor sit amet, lorem ipsum mamène."
        }
      ]},
      { id: uuid.v1(), name: 'Doing', cards: [] },
      { id: uuid.v1(), name: 'Done', cards: [] }
    ]});
  }

  addColumn(name) {
    this.setState({ columns: [ ...this.state.columns, {
      id: uuid.v1(),
      name: name,
      cards: []
    }]});
  }

  setEditedColumn(column) {
    this.setState({editedColumn: column});
  }

  renderColumns() {
    return this.state.columns.map(col => {
      return <Column
        key={col.id}
        column={col}
        editing={null !== this.state.editedColumn && col === this.state.editedColumn}
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
