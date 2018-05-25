import { cards } from '../database/';

export const FETCH_CARDS = 'FETCH_CARDS';

export function fetchCards(columnId) {
  return (dispatch) => {
    cards.child(columnId).on('value', snapshot => {
      dispatch({
        type: FETCH_CARDS,
        payload: { id: columnId, cards: snapshot.val() ? snapshot.val() : {} }
      });
    });
  };
}

export function addCard(data, columnId) {
  return dispatch => cards.child(columnId).push(data);
}

export function editCard(id, columnId, datas) {
  return dispatch => cards.child(columnId).child(id).set(datas);
}

export function removeCard(id, columnId) {
  return dispatch => cards.child(columnId).child(id).remove();
}
