import React ,{ Component } from 'react';
import $ from 'jquery';
import { cookie } from "../common/cookie";
import {datefmt} from '../common/dateformat';
import {message} from 'antd';
import TableCustom from '../common/table/TableCustom';
import SearchCustom from '../common/searchcondition/SearchCustom';

class MemberInfo extends Component{
	constructor(props){
		super(props);
		this.state = {
			data:[],
			totalcount:0,
			isloading:false,
			pageindex:1,
			pagesize:20,
			searchTxt:'',
			starttime:'',
			endtime:'',
			selectoption:'membername'
		};
		this.pageSizeChange = this.pageSizeChange.bind(this);
		this.setRowKey = this.setRowKey.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.datePickerChange = this.datePickerChange.bind(this);
		this.showTotal = this.showTotal.bind(this);
		this.selectChange = this.selectChange.bind(this);
		this.showSizeChange = this.showSizeChange.bind(this);
	}

	pageSizeChange(page,pagesize){
		this.setState({
			isloading:true,
			pageindex:page,
			pagesize:pagesize
		});
		this.loadData({pageindex:page,pagesize:pagesize});
	}

	setRowKey(record){
		return record.RecId;
	}

	datePickerChange(data,dataString){
		this.setState({
			starttime:dataString[0],
			endtime:dataString[1]
		});
	}

	onSearch(value){
		this.setState({
			isloading:true,
			pageindex:0,
			searchTxt:value
		});
		const params = {};
		params.pageindex = 0;
		params[this.state.selectoption] = value;
		this.loadData(params);
	}

	selectChange(value){
		this.setState({
			selectoption:value
		});
	}

	showTotal(total,range){
		return `总记录:${total}条`;
	}

	showSizeChange(page,pagesize){
		this.setState({
			isloading:true,
			pageindex:page,
			pagesize:pagesize
		});
		this.loadData({pageindex:page,pagesize:pagesize});
	}

	loadData(params){
		const _this = this;
		const p = {};
		p[this.state.selectoption] = this.state.searchTxt;
		const param = Object.assign({},p,
			{
				accesstoken:cookie('token'),
				pageindex:this.state.pageindex,
				pagesize:this.state.pagesize,
				createtimestart:this.state.starttime,
				createtimeend:this.state.endtime
			},params);
		$.get('/member',param,function (d) {
			if(d.IsError){
				message.error('数据错误');
				return;
			}
			_this.setState({
				data:d.Data.Collection,
				totalcount:d.Data.TotalCount,
				isloading:false
			});
		});
	}

	componentDidMount(){
		this.setState({isloading:true});
		this.loadData();
	}

	render(){
		const { data , totalcount, isloading} = this.state;
		const columns = [
			{
				title:'会员名',
				dataIndex:'MemName',
				width:'200px'
			},
			{
				title:'联系电话',
				dataIndex:'Phone',
				width:'150px'
			},
			{
				title:'店铺名称',
				dataIndex:'ShopName',
				width:'200px'
			},
			{
				title:'所在省份',
				dataIndex:'ProvinceName',
				key:'ProvinceName',
				width:'150px'
			},
			{
				title:'所在城市',
				dataIndex:'CityName',
				key:'CityName',
				width:'150px'
			},
			{
				title:'所在地区',
				dataIndex:'AreaName',
				key:'AreaName',
				width:'200px'
			},
			{
				title:'详细地址',
				dataIndex:'Address',
				key:'Address'
			},
			{
				title:'创建时间',
				dataIndex:'CreateTime',
				key:'CreateTime',
				render:(record) => datefmt(record,'yyyy-MM-dd')
			}
		];
		const opts = [
			{value:'MemberName',text:'按会员名查询'},
			{value:'ProvinceName',text:'按省份查询'},
			{value:'CityName',text:'按城市查询'},
			{value:'AreaName',text:'按地区名查询'}
		]
		return (
			<div>
				<SearchCustom onSearch={this.onSearch}
							  datePickerChange={this.datePickerChange}
							  showDatePicker={true}
							  showSelect={true}
							  selectWidth={150}
							  selectOpts={opts}
							  selectDefault={'MemberName'}
							  selectChange={this.selectChange}
				/>
				<TableCustom setRowKey={this.setRowKey}
							 columns={columns}
							 datasource={data}
							 hasborder={false}
							 isloading={isloading}
							 pageSizeChange={this.pageSizeChange}
							 totalcount={totalcount}
							 showTotal={this.showTotal}
							 showSizeChange={this.showSizeChange}
				/>
			</div>
		);
	}
}

export default MemberInfo;