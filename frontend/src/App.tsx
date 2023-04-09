import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Router } from "routes";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL || "http://localhost:3002/graphql",
  cache: new InMemoryCache(),
});

export default function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  );
}
