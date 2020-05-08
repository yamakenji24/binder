import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/link-context';
import Login from './components/Login';
import * as serviceWorker from './serviceWorker';
import './stylesheets/index.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/query',
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include'
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Login />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
