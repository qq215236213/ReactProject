import React, { Component } from 'react';

export default class Test extends Component{
	componentDidMount(){
		console.log(this.inputElement)
	}
	render(){
		return (
			<Parent inputRef={el => this.inputElement = el} />
		);
	}
}

function CustomTextInput(props) {
	return (
		<div>
			<input type="text" ref={props.inputRef}/>
		</div>
	);
};

function Parent(props) {
	return (
		<div>
			My Input : <CustomTextInput inputRef={props.inputRef}/>
		</div>
	);
};