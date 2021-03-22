import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Movies from './Components/Movies';
import AddMovie from './Components/AddMovie';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="hero" />
      <div className="container-fluid px-0 header">
        <div className="d-flex flex-column align-items-center">
          <h1 className="page-title title my-2">Movies</h1>
          <AddMovie />
        </div>
      </div>
      <div className="container">
        <Movies />
      </div>
    </ApolloProvider>
  );
}

export default App;
