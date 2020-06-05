import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/link-context';

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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include'
})
