import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.scss";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './redux/reducers/rootReducer';

const myStore = createStore(rootReducer,applyMiddleware(Thunk, createLogger));

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
