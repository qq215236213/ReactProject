import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {Home,store} from './components/Home';
import {Provider} from 'react-redux';

class App extends Component {
  render() {
    return (
       <Provider store={store}>
          <Router>
              <div>
                  <Route exact path='/' component={Home} />
              </div>
          </Router>
       </Provider>
    );
  }
}


export default App;
