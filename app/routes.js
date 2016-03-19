import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomeScreen from './containers/HomeScreen';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeScreen} />
  </Route>
);
