import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import {Provider } from 'mobx-react';
import stores from './stores/index'
import { Robot } from './utils/Robot';
const providers={
  ...stores,
  robot:new Robot
}
ReactDOM.render((
    <Provider {...providers}>
    <HashRouter>
      <App />
    </HashRouter>
    </Provider>
  ), document.getElementById('root'));

