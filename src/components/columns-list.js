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

    this.addColumn  = this.addColumn.bind(this);
    this.editColumn = this.editColumn.bind(this);
    this.addCard    = this.addCard.bind(this);
    this.editCard   = this.editCard.bind(this);
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

  editColumn(name, editedColumn) {
    let columns = this.state.columns.map(function(column) {
      if (column.id === editedColumn.id) {
        column.name = name;
      }

      return column;
    });

    this.setState({columns});
  }

  addCard(cardName, column) {
    let newColumns = this.state.columns.map(function(col) {
      if (col.id === column.id) {
        col.cards.push({ id: uuid.v1(), name: cardName });
      }

      return col;
    })

    this.setState({columns: newColumns});
  }

  editCard(cardName, card) {
    const columnIndex = this.state.columns.findIndex(currentColumn => {
      return currentColumn.cards.find(currentCard => currentCard.id === card.id) !== undefined;
    });
    const cardIndex = this.state.columns[columnIndex].cards.findIndex(currentCard => currentCard.id === card.id);

    const columns = [ ...this.state.columns ];
    columns[columnIndex].cards[cardIndex].name = cardName;

    this.setState({columns});
  }

  render() {
    const columns = this.state.columns.map(col => {
      return <Column
        key={col.id}
        column={col}
        editColumn={this.editColumn}
        editCard ={this.editCard}
        addCard ={this.addCard} />
    });

    return (
      <div className="row the-row">
        {columns}
        <NewColumn addColumn={this.addColumn} />
      </div>
    );
  }
}

export default ColumnsList;
