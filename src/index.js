import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/';
import thunk from 'redux-thunk'

import App from './components/app';

const createStoreWithMiddlewares = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddlewares(reducers)}>
    <App />
  </Provider>,
  document.querySelector('#container')
);
