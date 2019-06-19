import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter } from 'react-router-dom'
import './index.css';
import './alertify.min.css';
import './default.min.css';
import App from './App';
import {Provider } from 'mobx-react';
import stores from './stores/index'
import { Robot,RobotMock } from './utils/Robot';
import alertify from 'alertifyjs';

const providers={
  ...stores,
  robot: /* new RobotMock() */new Robot()
}
ReactDOM.render((
    <Provider {...providers}>
    <HashRouter>
      <App />
    </HashRouter>
    </Provider>
  ), document.getElementById('root'));

