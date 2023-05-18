import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

import Navbar from './components/Navbar'
import WrongPage from './pages/WrongPage'

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext ((parent, {headers}) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          {/* <Route exact path='/home' component={HomeMenu} />
          <Route exact path='/notebook' component={Notebook} />
          <Route exact path='/wordchain' component={WordChain} />
          <Route exact path='/practicechat' component={PracticeChat} /> */}
          <Route render={WrongPage} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
