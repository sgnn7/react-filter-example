'use strict';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import mongoose from 'mongoose';

import CollectiveSearch from './components/CollectiveSearch';
import express from 'express';

import Collectives from './model/collectives';

const HTTP_PORT = 8080;
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('layout', {
      content: ReactDOMServer.renderToString(<CollectiveSearch />),
    });
});

app.get('/collectives', (req, res) => {
    // TODO: Only send needed fields
    const filter = req.query.filter;
    Collectives.find({ name: new RegExp(filter, 'i') }).then(results => {
        res.json(results);
    });
});

// Connect the database
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/react-filter-test');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.info('Database connected!');
});

app.listen(HTTP_PORT, () => {
  console.log('Server started at http://localhost:%s', HTTP_PORT);
});
