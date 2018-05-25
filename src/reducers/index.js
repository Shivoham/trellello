import { combineReducers } from 'redux';
import { FETCH_COLUMNS } from '../actions/columns';
import { FETCH_CARDS } from '../actions/cards';

function columnsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_COLUMNS:
      return action.payload;
    default:
      return state;
  }
}

function cardsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_CARDS:
      return { ...state, [action.payload.id]: action.payload.cards}
    default:
      return state;
  }
}

const reducers = combineReducers({
  columns: columnsReducer,
  cards: cardsReducer
});

export default reducers;
