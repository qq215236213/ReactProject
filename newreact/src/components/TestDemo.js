import React , { Component } from 'react';

class Button extends Component{
	render(){
		return (
			<button style={{background:this.props.color}}>
				{this.props.children}
			</button>
		);
	}
};

class Message extends Component{
	render(){
		return(
			<div>
				{this.props.text} <Button color={this.props.color}>Delete</Button>
			</div>
		);
	}
};

class MessageList extends Component{
	render(){
		const color = 'purple';
		const children = this.props.messages.map((message,index) =>{
			return (
				<Message text={message.text} color={color} key={index}/>
			);
		});
		return (
			<React.Fragment>{children}</React.Fragment>
		);
	}
}

export default class TestDemo extends Component{
	render(){
		const list = [{
			text:'jim'
		},{
			text:'lily'
		},{
			text:'lay'
		}
		];
		return (
			<React.Fragment>
				<MessageList messages={list}/>
			</React.Fragment>
		);
	}
};