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
      <div className="app">
        <h1>My Movies</h1>
        <AddMovie />
        <hr />
        <Movies />
      </div>
    </ApolloProvider>
  );
}

export default App;
