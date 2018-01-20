import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppLogin from './AppLogin';
import registerServiceWorker from './registerServiceWorker';

const path = window.location.hash;
if(/#\/login/.test(path)){
	ReactDOM.render(<AppLogin />, document.getElementById('root'));
}else{
	ReactDOM.render(<App />, document.getElementById('root'));
}


registerServiceWorker();
