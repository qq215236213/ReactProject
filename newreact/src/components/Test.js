import React, { Component } from 'react';
import CustomInput from './common/CustomInput';

export default class Test extends Component{
	/*componentDidMount(){
		console.log(this.inputElement)
	}
	render(){
		return (
			<Parent inputRef={el => this.inputElement = el} />
		);
	}*/
	constructor(props){
		super(props);
		this.refElement = null;
		this.getElement = this.getElement.bind(this);
	}
	getElement(obj){
		console.log(obj);
		this.refElement = obj;
	}

	render(){
		return(
			<CustomInput getElement={this.getElement}/>
		);
	}
}



/*
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
};*/
