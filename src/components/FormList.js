import React , { Component } from 'react';
import PropTypes from 'prop-types';
import {showText} from './redex/action';


class FormList extends Component{
	constructor(props,context){
		super(props,context);
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(){
		const {store} = this.context;
		store.dispatch(showText);
	}

	render(){
		return(
			<div>
				<label>{this.props.data.text}</label>
				<input type='text' value={this.props.data.isShow?this.props.data.text:''}/>
				<button type='button' onClick={this.clickHandler}>show</button>
			</div>
		);
	}
}

FormList.contextTypes = {
	store:PropTypes.object.isRequired
}

export default FormList;

