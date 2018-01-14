import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import TableList from './components/TableList';

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route path={'/list'} component={TableList}/>
            </div>
        </Router>
    );
  }
}

export default App;
