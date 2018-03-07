'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import CollectiveSearch from './components/CollectiveSearch';

ReactDOM.hydrate(<CollectiveSearch />,
                 document.getElementById('content'));
