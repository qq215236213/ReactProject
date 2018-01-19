import React, {Component} from "react";
import {HashRouter as Router , Route} from 'react-router-dom';
import Login from "./components/Login";

class AppLogin extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route path='/login' component={Login}></Route>
				</div>
			</Router>
		);
	}
}

export default AppLogin;