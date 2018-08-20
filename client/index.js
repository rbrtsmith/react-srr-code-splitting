import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux';
import { AsyncComponentProvider } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import { JobProvider } from 'react-jobs';

import createStore from '../src/createStore';
import Layout from '../src/Layout';

const App = (
  <AsyncComponentProvider  rehydrateState={ window.ASYNC_COMPONENTS_STATE}>
    <JobProvider rehydrateState={window.JOBS_STATE}>
      <ReduxProvider store={createStore(window.REDUX_DATA)}>
        <Router>
          <Layout />
        </Router>
      </ReduxProvider>
    </JobProvider>
  </AsyncComponentProvider>
);

asyncBootstrapper(App).then(() => {
  hydrate(App, document.querySelector('#app'));
});
