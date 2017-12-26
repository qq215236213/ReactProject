import React ,{Component} from 'react';
import Template from '../../Common/Template';
import Title from '../../Common/Title';
import {Table} from 'react-bootstrap';
import $ from 'jquery/dist/jquery.min';
import cookie from '../../Libs/Cookie';


class Personal extends Component{
	constructor(props){
		super(props);
		this.state = {
			totalAsset:0,
			assetList:[]
		}
	}
	componentDidMount(){
		$.get('http://www.jzg.com/member/finance',{memberid:cookie.Cookie('memberid'),accesstoken:cookie.Cookie('token')},(d)=> {
			this.setState({
				assetList:d.Data.Collection||[],
				totalAsset:(d.Data && d.Data.Collection && d.Data.Collection.length > 0 )?(d.Data.Collection[0].MemberBalance||0):0
			});
		});
	}
	render(){
		let item = this.state.assetList.map((item,index) =>{
			if(item.CoinType ==='人民币'){
				return (
				<tr key={index}>
					<td>{item.CoinType}</td>
					<td>￥{item.AvailableAmount}</td>
					<td>￥{item.UnavailableAmount}</td>
					<td>￥{item.TotalAmount}</td>
				</tr>);
			}else {
				return (
					<tr key={index}>
						<td>{item.CoinType}</td>
						<td>Z{item.AvailableAmount}</td>
						<td>Z{item.UnavailableAmount}</td>
						<td>Z{item.TotalAmount}</td>
					</tr>

				);
			}
		})
		const content = (
			<div>
				<Title title='个人财务'/>
				<div style={{padding:'0 10px 0 20px',height:'30px',lineHeight:'30px'}}>
					<div style={{backgroundColor: '#fffaf4',borderColor: '#edd9c8',color: '#ff6000',height: 'auto',overflow: 'hidden',width: '768px'}}>
						<div className="pull-left">
							<label>预估总资产：￥</label>
							<label>{this.state.totalAsset}</label><label>元</label>
						</div>
						<div className="pull-right">
							<a>充值</a>
						</div>
					</div>
				</div>
				<Table responsive striped bordered condensed hover style={{width:'768px'}}>
					<thead>
						<tr>
							<th>币种名称</th>
							<th>可用数量</th>
							<th>冻结数量</th>
							<th>总量</th>
						</tr>
					</thead>
					<tbody>
						{item}
					</tbody>
				</Table>
			</div>
			);

		return (
			<Template content={content}></Template>
		);
	}
}

export default Personal
