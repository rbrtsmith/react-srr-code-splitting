import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

import Header from './Header';

const LoadingComponent = () => <div>Loading…</div>;

export default class Layout extends React.Component {
  state = { title: 'Hello layout'}

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <Header />
        <Switch>
          <Route path="/" exact component={asyncComponent({
            resolve: () => import('./Home'),
            LoadingComponent
          })} />
          <Route path="/about" exact component={asyncComponent({
            resolve: () => import('./About'),
            LoadingComponent
          })} />
          <Route path="/contact" exact component={asyncComponent({
            resolve: () => import('./Contact'),
            LoadingComponent
          })} />
          <Route path="/secret" exact component={asyncComponent({
            resolve: () => import('./Secret'),
            LoadingComponent
          })} />
        </Switch>
      </div>
    )
  }
}
