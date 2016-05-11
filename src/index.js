import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.scss';
import 'font-awesome/css/font-awesome.min.css';

const store = configureStore();
const memoryHistory = createMemoryHistory('/');
const history = syncHistoryWithStore(memoryHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
