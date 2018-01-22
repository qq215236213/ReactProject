import React, { Component } from 'react';
import {HashRouter as Router} from 'react-router-dom';
import AppInner from './AppInner';

class  App extends Component{
    render(){
        return (
        	<Router>
				<AppInner/>
			</Router>
        );
    }
}


export default App;

