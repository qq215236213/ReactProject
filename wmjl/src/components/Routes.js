import React ,{ Component } from 'react';
import {Route} from 'react-router-dom';
import PageLayout from './common/layout/PageLayout';
import PlatForm from './platforms/PlatForm';
import ManagerList from './managers/ManagerList';
import MemberInfo from './members/MemberInfo';

class Routes extends Component{
	render(){
		return (
			<PageLayout>
				<Route path={'/'} component={MemberInfo}/>
				<Route path={'/platform'} component={PlatForm}/>
				<Route path={'/manager'} component={ManagerList}/>
			</PageLayout>
		);
	}
}


export default Routes;
