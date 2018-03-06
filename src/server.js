import React from 'react';
import ReactDOMServer from 'react-dom/server';

import CollectiveFilter from './components/CollectiveFilter';
import express from 'express';

const HTTP_PORT = 8080;
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('layout', {
      content: ReactDOMServer.renderToString(<CollectiveFilter />)
    });
});

app.listen(HTTP_PORT, () => {
  console.log('Server started at http://localhost:%s', HTTP_PORT);
});
