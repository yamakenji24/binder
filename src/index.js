import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from '@apollo/client';
import Login from './components/Login';
import * as apollo from './constants/apollo';
import * as serviceWorker from './serviceWorker';
import './stylesheets/index.css';


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apollo.client}>
      <Login />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
