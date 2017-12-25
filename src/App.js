import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Home,homeReducer} from './components/Home';
import {About,aboutReducer} from "./components/About";

class App extends Component {
  render() {
      let reducer = combineReducers({
		  home:homeReducer, about:aboutReducer
      });
      let store = createStore(reducer);
      console.log(store)
    return (
       <Provider store={store}>
          <Router>
              <div>
                  <Route exact path='/' component={Home} />
                  <Route path={'/about'} component={About}/>
              </div>
          </Router>
       </Provider>
    );
  }
}

export default App;
