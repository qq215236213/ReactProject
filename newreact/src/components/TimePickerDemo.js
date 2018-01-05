import React,{ Component } from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';

export default class TimePickerDemo extends Component{
	constructor(props){
		super(props);
		this.changeTime = this.changeTime.bind(this);
	}

	changeTime(time,timestring){
		console.log(timestring);
	}

	render(){
		return (
			<TimePick change={this.changeTime}/>
		);
	}
}

class TimePick extends Component{
	render(){
		return (
			<div>
				<TimePicker onChange={(obj,str) => this.props.change(obj,str)} defaultValue={moment(new Date().toString(),'HH:mm:ss')}/>
			</div>
		);
	}
}