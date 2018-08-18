import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Layout from '../src/Layout';

const app = express();

const htmlTemplate = reactDom => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>React SSR</title>
    </head>
    <body>
      <div id="app">${reactDom}</div>
      <script src="bundle.js"></script>
    </body>
  </html>
`;

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/*', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlTemplate(renderToString(<Layout />)))
});

app.listen(2048, () => console.log(`Listening on port 2048`));
