import React, { Component } from 'react';
import Column from './column.js';
import NewColumn from './new-column.js';
import uuid from 'uuid';

class ColumnsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: []
    };

    this.addColumn     = this.addColumn.bind(this);
    this.renderColumns = this.renderColumns.bind(this);
  }

  componentDidMount() {
    this.setState({ columns: [
      { id: uuid.v1(), name: 'Todo', cards: [
        { id: uuid.v1(), name: "Mettre un slip propre" },
        { id: uuid.v1(), name: "Mettre un nouveau slip" },
        { id: uuid.v1(), name: "Acheter un slip de couleur" }
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

  renderColumns() {
    return this.state.columns.map(col => {
      return <Column
        key={col.id}
        column={col} />
    });
  }

  render() {
    return (
      <div className="row">
        {this.renderColumns()}
        <NewColumn addColumn={this.addColumn} />
      </div>
    );
  }
}

export default ColumnsList;
