import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import App from './App';
import rootReducer from "./modules";
import './index.css';

const customHistory = createBrowserHistory();

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(ReduxThunk.withExtraArgument({ history: customHistory })))
);

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
