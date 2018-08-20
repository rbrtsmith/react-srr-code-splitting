import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import asyncBootstrapper from 'react-async-bootstrapper';
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component';
import { JobProvider, createJobContext } from 'react-jobs';
import serialize from 'serialize-javascript';

import createStore, { initializeSession } from '../src/createStore';
import Layout from '../src/Layout';

const app = express();

const htmlTemplate = ({ appString, reduxState, asyncState, jobsState }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>React SSR</title>
    </head>
    <body>
      <div id="app">${appString}</div>
      <script>
        window.REDUX_DATA = ${serialize(reduxState)}
        window.ASYNC_COMPONENTS_STATE = ${serialize(asyncState)}
        window.JOBS_STATE = ${serialize(jobsState)}
      </script>
      <script src="bundle.js"></script>
    </body>
  </html>
`;

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/*', (req, res) => {
  const asyncContext = createAsyncContext();
  const jobContext = createJobContext();
  const routeContext = {};
  const store = createStore();

  store.dispatch(initializeSession());

  const App = (
    <AsyncComponentProvider asyncContext={asyncContext}>
      <JobProvider jobContext={jobContext}>
        <ReduxProvider store={store}>
          <StaticRouter context={routeContext} location={req.url}>
            <Layout />
          </StaticRouter>
        </ReduxProvider>
      </JobProvider>
    </AsyncComponentProvider>
  );

  asyncBootstrapper(App).then(() => {
    const appString = renderToString(App);
    const reduxState = store.getState();
    const asyncState = asyncContext.getState();
    const jobsState = jobContext.getState();
  
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlTemplate({ appString, reduxState, asyncState, jobsState }));
  });

});

app.listen(2048, () => console.log(`Listening on port 2048`));
