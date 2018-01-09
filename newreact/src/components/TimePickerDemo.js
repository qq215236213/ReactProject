import React,{ Component } from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import Uploader from './common/Uploader';
import Selecter from './common/Selecter';
import TagSelect from './common/TagSelect';

export default class TimePickerDemo extends Component{
	constructor(props){
		super(props);
		this.changeTime = this.changeTime.bind(this);
		this.uploadSuccess = this.uploadSuccess.bind(this);
		this.uploadFail = this.uploadFail.bind(this);
		this.uploadRemove = this.uploadRemove.bind(this);
		this.selecterChange = this.selecterChange.bind(this);
		this.freshSelector = this.freshSelector.bind(this);
	}

	changeTime(time,timestring){
		console.log(time);
		console.log(timestring);
	}

	uploadSuccess(file){
		console.log(file);
	}

	uploadRemove(file){
		console.log(file);
	}

	uploadFail(file){
		console.log("fail:");
		console.log(file);
	}

	selecterChange(value){
		console.log(value);
	}

	freshSelector(){
		this.select.refreshData(1);
	}

	render(){
		return (
			<div>
				<TimePick change={this.changeTime}/>
				<Uploader success={this.uploadSuccess} fail={this.uploadFail} remove={this.uploadRemove} url={'//jsonplaceholder.typicode.com/posts/'} token={''}/>
				<Selecter ref={el => this.select = el} optionlist={['jim','lucy','lily']} defaultvalue={'lily'} change={this.selecterChange} />
				<button type={'button'} onClick={this.freshSelector}>刷新下拉框</button>
				<TagSelect change={this.selecterChange}/>
			</div>
		);
	}
}

class TimePick extends Component{
	render(){
		return (
			<React.Fragment>
				<TimePicker allowEmpty={false} onChange={(obj,str) => this.props.change(obj,str)} defaultValue={moment(new Date(),'HH:mm:ss')}/>
			</React.Fragment>
		);
	}
}