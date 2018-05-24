import React, { Component } from 'react';
import Column from './column.js';
import NewColumn from './new-column.js';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { fetchColumns } from '../actions/columns';
import _ from 'lodash';

class ColumnsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: []
    };

    this.editColumn = this.editColumn.bind(this);
    this.addCard    = this.addCard.bind(this);
    this.editCard   = this.editCard.bind(this);
  }

  componentDidMount() {
    this.props.fetchColumns();
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
    const columns = _.map(this.props.columns, (col, id) => {
      return <Column
        key={id}
        column={col}
        id={id}
        editColumn={this.editColumn}
        editCard ={this.editCard}
        addCard ={this.addCard} />
    });

    return (
      <div className="row the-row">
        {columns}
        <NewColumn />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { columns: state.columns };
}

export default connect(mapStateToProps, { fetchColumns })(ColumnsList);
