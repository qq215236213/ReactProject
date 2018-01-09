import React,{ Component } from 'react';
import { TimePicker,Pagination } from 'antd';
import moment from 'moment';
import Uploader from './common/Uploader';
import Selecter from './common/Selecter';
import TagSelect from './common/TagSelect';
import InputSearchText from './common/InputSearchText';

export default class TimePickerDemo extends Component{
	constructor(props){
		super(props);
		this.changeTime = this.changeTime.bind(this);
		this.uploadSuccess = this.uploadSuccess.bind(this);
		this.uploadFail = this.uploadFail.bind(this);
		this.uploadRemove = this.uploadRemove.bind(this);
		this.selecterChange = this.selecterChange.bind(this);
		this.freshSelector = this.freshSelector.bind(this);
		this.searchTextCallBack = this.searchTextCallBack.bind(this);
		this.pageChange = this.pageChange.bind(this);
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

	searchTextCallBack(value){
		console.log(value);
	}

	pageChange(current,pagesize){
		console.log(`current=${current},pagesize=${pagesize}`);
	}

	render(){
		return (
			<div>
				<TimePick change={this.changeTime}/>
				<Uploader success={this.uploadSuccess} fail={this.uploadFail} remove={this.uploadRemove} url={'//jsonplaceholder.typicode.com/posts/'} token={''}/>
				<Selecter ref={el => this.select = el} optionlist={['jim','lucy','lily']} defaultvalue={'lily'} change={this.selecterChange} />
				<button type={'button'} onClick={this.freshSelector}>刷新下拉框</button>
				<TagSelect change={this.selecterChange}/>
				<InputSearchText style={{width:'200px'}} placeholder={'input search text'} callback={this.searchTextCallBack} />
				<Pagination
					total={888}
					showTotal={(total,range) => `总记录:${total}条,当前${range[0]}-${range[1]}`}
					defaultCurrent={1}
					showSizeChanger
					onShowSizeChange={this.pageChange}
					onChange={this.pageChange}
				/>
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