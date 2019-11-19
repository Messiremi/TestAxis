import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.css';
import Content from './js/main.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Content api="http://127.0.0.1:8001/api/"/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
