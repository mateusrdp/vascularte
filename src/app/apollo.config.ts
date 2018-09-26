import {__AUTH_TOKEN} from './constants';
import {HttpHeaders} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const uri = 'http://localhost:4000';
    const http = httpLink.create({ uri });
    const token = localStorage.getItem(__AUTH_TOKEN);

    const middleware = new ApolloLink((operation, forward) => {
      if (token) {
        operation.setContext({
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        });
      }
      return forward(operation);
    });

    const ws = new WebSocketLink({
      uri: `ws://localhost:4000`,
      options: {
        reconnect: true,
        connectionParams: {
          authToken: token
        }
      }
    });

    const link = split(
      ({query}) => {
        const {kind, operation} = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      ws,
      http,
    );

    apollo.create(
      {
      link: middleware.concat(link),
      cache: new InMemoryCache()
    });
  }
}
