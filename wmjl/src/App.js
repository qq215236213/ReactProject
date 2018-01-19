import React, { Component } from 'react';
import {HashRouter as Router , Route} from 'react-router-dom';
import PageLayout from './components/common/layout/PageLayout';
import MemberInfo from './components/member/MemberInfo';
import ManagerList from './components/managers/ManagerList';

class  App extends Component{
    render(){
        return (
            <PageLayout>
				<Router>
					<div>
						<Route path={'/'} exact component={MemberInfo}/>
						<Route path={'/manager'} component={ManagerList}/>
					</div>
				</Router>
            </PageLayout>
        );
    }
}


export default App;

