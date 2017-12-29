import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';
/*import {Home,homeReducer} from './components/Home';
import {About,aboutReducer} from "./components/About";*/
import Home from './components/Home';
import About from "./components/About";
import {homeReducer,aboutReducer} from './components/redux/reducer';
import News from './components/News';
import Demo from './components/Demo';

class App extends Component {
  render() {
      let reducer = combineReducers({
		  home:homeReducer, about:aboutReducer
      });
      let store = createStore(reducer);
    return (
       <Provider store={store}>
          <Router>
              <div>
                  <Route exact path='/' component={Home} />
                  <Route path={'/about'} component={About}/>
                  <Route path={'/news'} component={News}/>
                  <Route path={'/demo'} component={Demo}/>
              </div>
          </Router>
       </Provider>
    );
  }
}



export default App;
