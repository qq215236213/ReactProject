import React, { Component } from 'react';
import {HashRouter as Router , Route} from 'react-router-dom';
import PageLayout from './components/common/layout/PageLayout';
import MemberInfo from './components/members/MemberInfo';
import ManagerList from './components/managers/ManagerList';
import PlatForm from "./components/platforms/PlatForm";

class  App extends Component{
    render(){
        return (
            <PageLayout>
				<Router>
					<div>
						<Route path={'/'} exact component={MemberInfo}/>
						<Route path={'/manager'} component={ManagerList}/>
						<Route path={'/platform'} component={PlatForm}/>
					</div>
				</Router>
            </PageLayout>
        );
    }
}


export default App;

