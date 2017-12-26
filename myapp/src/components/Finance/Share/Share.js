import React,{Component} from 'react';
import NavBar from './NavBar';
import Template from '../../Common/Template';
import {Table} from 'react-bootstrap';
import $ from 'jquery/dist/jquery.min';
import cookie from '../../Libs/Cookie';
import show from '../../Libs/ToolTip';

class Share extends Component{
	constructor(props){
		super(props);
		this.state = {
			datalist: []
		}

	}

	componentDidMount(){
		$.get('http://www.jzg.com/share/info',{memberid:cookie.Cookie('memberid'),accesstoken:cookie.Cookie('token'),state:0},(d) =>{
			if(d.IsError){
				show.msg(d.Msg);
				return;
			}
			if(d.Data && d.Data.Collection){
				this.setState({
					datalist:d.Data.Collection
				})
			}
		})
	}

	render(){
		const getStatus = (num) =>{
			if(num === 0){
				return (
					<span style={{color:'red'}}>未发放</span>
				);
			}else{
				return (
					<span style={{color:'green'}}>已发放</span>
				);
			}
		}
		let items = this.state.datalist.map((item,index) =>{
			return (
				<tr data-id={item.Id} key={index}>
					<td>item.Title</td>
					<td>item.CreateTime</td>
					<td>item.ShareType</td>
					<td>item.ShareTotalAmount</td>
					<td>item.ShareAmount</td>
					<td>
						{getStatus(item.CurStatus || 0)}
					</td>
				</tr>
			);
		})
		const content = (
			<div>
				<NavBar first='0'/>
				<div style={{width:'100%',height:'10px'}}></div>
				<Table striped bordered condensed hover responsive>
					<thead>
					<tr>
						<th>标题</th>
						<th>分红日期</th>
						<th>类型</th>
						<th>本次分红总额</th>
						<th>获得分红金额</th>
						<th>状态</th>
					</tr>
					</thead>
					<tbody>
					{items}
					</tbody>
				</Table>
			</div>
		);
		return (
			<Template content={content}/>
		);
	}
}

export default  Share;