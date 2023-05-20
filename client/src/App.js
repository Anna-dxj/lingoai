import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

import Navbar from './components/Navbar'
import WrongPage from './pages/WrongPage'
import LoginPage from './pages/LoginPage'

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
        <Routes>
          {/* 
          <Route path='/notebook' element={<Notebook />} /> 
          */}
          <Route path='/home' element={<WrongPage />} />
          <Route path="/login" element={<LoginPage />}/>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
