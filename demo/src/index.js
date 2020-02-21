import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Container/App';
import {Provider} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";

import * as serviceWorker from './serviceWorker';
import store from './store/config'

ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>,
 document.getElementById('root'));


serviceWorker.unregister();
