import React, { Component } from 'react';
import { Route, withRouter} from 'react-router-dom';
import Login from './components/Login';
import PageLayout from './components/common/layout/PageLayout';
import PlatForm from './components/platforms/PlatForm';
import ManagerList from './components/managers/ManagerList';
import MemberInfo from './components/members/MemberInfo';

class  AppInner extends Component{
	renderLogin(){
		return (
			<Route path={'/login'} component={Login}/>
		)
	}

	renderLayout(){
		return (
				<PageLayout>
					<Route path={'/'} exact component={MemberInfo} />
					<Route path={'/manager'} component={ManagerList}/>
					<Route path={'/platform'} component={PlatForm}/>
				</PageLayout>
		);
	}

	render(){
		if(this.props.location.pathname==='/login'){
			return this.renderLogin()
		}
		return this.renderLayout();
	}
}


export default withRouter(AppInner);

