import { ApolloClient, createHttpLink, NormalizedCacheObject } from '@apollo/client';
import { cache } from './cache';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://18.193.202.36:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('access_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
});

export default client;
