import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_BASE_URL,
  fetchOptions: {
    mode: "no-cors",
  },
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const user = JSON.parse(localStorage.getItem("user") ?? "");
  if (typeof user === "object") {
    if (typeof user.accessToken === "string") {
      return {
        headers: {
          ...headers,
          authorization: user.accessToken ? `Bearer ${user.accessToken}` : "",
        },
      };
    }
  }
  return {
    headers: {
      ...headers,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === "TokenExpiredError") {
        localStorage.clear();
        window.location.href = "/";
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
