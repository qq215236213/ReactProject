import React , { Component } from 'react';


export default class TestEvent extends Component{
	constructor(props){
		super(props);
		this.state = {
			txt:'请输入用户名'
		}
	}
	render(){
		let {txt} = this.state;
		return (
			<div>
				<input type="text" value={txt}/>
				<button>确定</button>
			</div>
		);
	}
}