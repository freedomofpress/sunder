import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomeScreen from './containers/HomeScreen';
import SplitScreen from './containers/SplitScreen';
import RecoverScreen from './containers/RecoverScreen';
import DistributeScreen from './containers/DistributeScreen';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeScreen} />
    <Route path="split" component={SplitScreen} />
    <Route path="distribute" component={DistributeScreen} />
    <Route path="recover" component={RecoverScreen} />
  </Route>
);
