import { columns } from '../database/';

export const FETCH_COLUMNS = 'FETCH_COLUMNS';

export function fetchColumns() {
  return (dispatch) => {
    columns.on('value', snapshot => {
      dispatch({
        type: FETCH_COLUMNS,
        payload: snapshot.val()
      });
    });
  }
}

export function addColumn(name) {
  return dispatch => columns.push({ name });
}

export function editColumn(id, datas) {
  return dispatch => columns.child(id).set(datas);
}

export function removeColumn(id) {
  return dispatch => columns.child(id).remove();
}
