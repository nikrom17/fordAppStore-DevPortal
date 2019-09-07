import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

import 'index.scss';
import App from 'app/app';
import registerServiceWorker from 'src/registerServiceWorker';
import authReducer from 'src/redux/reducers/authReducer';
import createAppReducer from 'src/redux/reducers/createAppReducer';
import accountSettingsReducer from 'src/redux/reducers/accountSettingsReducer';
import appReducer from 'src/redux/reducers/appReducer';
import appDetailsReducer from 'src/redux/reducers/appDetailsReducer';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  createApp: createAppReducer,
  settings: accountSettingsReducer,
  apps: appReducer,
  appDetails: appDetailsReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
