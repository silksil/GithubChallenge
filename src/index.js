import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';

import Nav from './components/nav_bar';
import NotFound from './components/not_found';
import Popular from './containers/popular';
import Results from './containers/results';
import Battle from './containers/battle';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route path="/popular" component={Popular}/>
          <Route exact path="/battle" component={Battle}/>
          <Route path="/battle/results" component={Results}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container')
);
