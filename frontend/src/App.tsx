import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Router } from "routes";
import { theme } from "theme";
import { Provider as ReduxProvider } from "react-redux";
import { useStore } from "redux/store";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL || "http://localhost:3002/graphql",
  cache: new InMemoryCache(),
});

export default function App(): JSX.Element {
  const store = useStore({});

  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
}
