import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';

import createStore from '../src/createStore';
import Layout from '../src/Layout';



const App = (
  <AsyncComponentProvider  rehydrateState={ window.ASYNC_COMPONENTS_STATE}>
    <Provider store={createStore(window.REDUX_DATA)}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  </AsyncComponentProvider>
);

asyncBootstrapper(App).then(() => {
  hydrate(App, document.querySelector('#app'));
});
