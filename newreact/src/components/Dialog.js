import React , { Component }from 'react';
import {Button,Modal} from 'antd';
import { ShowConfirm } from "./common/ShowConfirm";
import {ShowInfo} from "./common/ShowInfo";


export default class Dialog extends Component{
	constructor(props){
		super(props);
		this.state = {
			visible:false
		};
		this.btnClick = this.btnClick.bind(this);
		this.dialogClose = this.dialogClose.bind(this);
		this.dialogOk = this.dialogOk.bind(this);
		this.showConfirm = this.showConfirm.bind(this);
		this.showInfo = this.showInfo.bind(this);
	}

	btnClick(){
		this.setState({
			visible:!this.state.visible
		});
	}

	dialogClose(){
		this.setState({
			visible:!this.state.visible
		});
	}

	dialogOk(){
		console.log('Ok');
		this.setState({
			visible:!this.state.visible
		});
	}

	showConfirm(){
		ShowConfirm({
			title:'Do you Want to delete these items',
			content:'Some descriptions',
			okFun:function () {
				console.log('click ok');
			},
			cancelFun:function () {
				console.log('click cancel');
			}
		});
	}

	showInfo(){
		ShowInfo({
			title:'',
			content:'',
			okFun:function () {
				console.log('ok click');
			}
		});
	}

	render(){
		const {visible} = this.state;
		return (
			<div>
				<Button type={'primary'} onClick={this.btnClick}>Show Dialog</Button>
				<Button type={'primary'} style={{marginLeft:'10px'}} onClick={this.showConfirm}>Show Confirm</Button>
				<Button type={'primary'} style={{marginLeft:'10px'}} onClick={this.showInfo}>Show Info</Button>
				<Modal title={'Basic Modal'} visible={visible} onCancel={this.dialogClose} maskClosable={false} onOk={this.dialogOk}>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Modal>

			</div>
		);
	}
}