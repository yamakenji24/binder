import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from '@apollo/client';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './components/User/login';
import TopPage from './components/TopPage/';
import * as apollo from './constants/apollo';
import * as serviceWorker from './serviceWorker';
import './stylesheets/index.css';


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apollo.client}>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/toppage' component={TopPage}/>
        </Switch>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
