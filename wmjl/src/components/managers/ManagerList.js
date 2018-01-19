import React,{ Component } from 'react';
import TableCustom from '../common/table/TableCustom';
import SearchCustom from '../common/searchcondition/SearchCustom';
import ButtonCustom from '../common/actionbutton/ButtonCustom';
import AddMod from './AddMod';
import { datefmt } from "../common/dateformat";
import { cookie } from "../common/cookie";
import { tipMsg } from '../common/confirm/confirm';
import $ from 'jquery';
import md5 from 'md5';
import { message } from 'antd';

export default class ManagerList extends Component{
	constructor(props){
		super(props);
		this.state = {
			data:[],
			isloading:false,
			totalcount:0,
			showdialog:false,
			showcurstus:false,
			showeditpwdchk:false,
			editpwddisabled:true,
			showbatchdelbtn:false,
			batchdelids:[],
			needvalidate:true
		}
		this.onSearch = this.onSearch.bind(this);
		this.pageSizeChange = this.pageSizeChange.bind(this);
		this.setRowKey = this.setRowKey.bind(this);
		this.showTotal = this.showTotal.bind(this);
		this.showSizeChange = this.showSizeChange.bind(this);
		this.rowSelectChange = this.rowSelectChange.bind(this);
		this.editHandle = this.editHandle.bind(this);
		this.deleteHandle = this.deleteHandle.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onBatchDel = this.onBatchDel.bind(this);
		this.dialogCancel = this.dialogCancel.bind(this);
		this.dialogOk = this.dialogOk.bind(this);
		this.editPwdChkChange = this.editPwdChkChange.bind(this);
	}

	/**
	 * 查询框查询按钮事件*/
	onSearch(value){
		console.log(value);
	}

	/**
	 * 翻页*/
	pageSizeChange(page,pagesize){
		console.log(page);
		console.log(pagesize);
	}
	/**
	 * table 设置key值,默认不用改动*/
	setRowKey(record){
		return record.Id;
	}
	/**
     * 显示总记录数*/
	showTotal(total){
		return `总记录:${total}条`;
	}
	/**
	 * 每页显示记录条数按钮事件*/
	showSizeChange(page,pagesize){
		console.log(page);
		console.log(pagesize);
	}
	/**
	 * checkbox 按钮事件*/
	rowSelectChange(selectedRowKeys,selectedRows){
		const lenght = selectedRowKeys.length;
		if(lenght == 0){
			this.setState({
				showbatchdelbtn:false
			});
			return ;
		}else{
			this.setState({
				showbatchdelbtn:true
			});
		}
		this.setState({
			batchdelids:selectedRowKeys
		});
	}
	/**
	 * 修改按钮事件*/
	editHandle(id){
		this.setState({
			showdialog:true,
			showcurstus:true,
			showeditpwdchk:true,
			editpwddisabled:true
		});
	}
	/**
	 * 删除按钮事件*/
	deleteHandle(id){
		const _this = this;
		tipMsg('提示','确定删除吗?',function () {
			$.post('/manager/batchdel',{ids:[id],accesstoken:cookie('token')},function (d) {
				console.log(d);
				if(d.IsError){
					message.error(d.Msg);
					return;
				}
				message.success('删除成功');
				_this.loadData();
			});
		});
	}

	/**
	 * 新增按钮事件*/
	onAdd(){
		this.setState({
			showdialog:true,
			showcurstus:false,
			showeditpwdchk:false,
			editpwddisabled:false
		});
	}

	/**
	 * 批量删除按钮事件*/
	onBatchDel(){
		console.log('batchdel')
	}

	/**
	 * modal对话框取消事件*/
	dialogCancel(){
		this.setState({showdialog:false});
	}

	/**
	 * modal对话框确定事件*/
	dialogOk(){
		const _this = this;
		const {form} = this.formRef.props;
		form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				const params = {
					loginname: values.loginname,
					loginpwd : md5(values.password),
				 	issystemmanager : values.issystem==='1' ? true : false,
					accesstoken:cookie('token')
				}

				$.post('/manager',params,function (d) {
					if(d.IsError){
						message.error(d.Msg);
						return;
					}
					_this.loadData();
					_this.setState({showdialog:false});
				});
			}
		});

	}

	/**
	 * modal 对话框中修改checkbox事件*/
	editPwdChkChange(){
		this.setState({
			editpwddisabled:!this.state.editpwddisabled
		});
	}

	/**
	 * 加载数据*/
	loadData(params){
		const _this = this;
		const param = Object.assign({},{
			accesstoken:cookie('token')
		},params);
		$.get('/manager',param,function (d) {
			_this.setState({
				data:d.Data.Collection||[],
				totalcount:d.Data.TotalCount
			});
		});
	}

	componentDidMount(){
		this.loadData();
	}

	render(){
		const {data,isloading,totalcount,showdialog,showcurstus,showeditpwdchk,editpwddisabled,showbatchdelbtn} = this.state;
		const columns = [
			{
				title:'登录名',
				dataIndex:'LoginName',
				key:'LoginName',
			},
			{
				title:'状态',
				dataIndex:'CurStatus',
				key:'CurStatus',
				width:'150px',
				render:(record) =>record === 0?'正常':'禁用'
			},
			{
				title:'是否管理员',
				dataIndex:'IsSystemManager',
				key:'IsSystemManager',
				width:'150px',
				render:(record) => record?'√':''
			},
			{
				title:'创建时间',
				dataIndex:'CreateTime',
				key:'CreateTime',
				width:'150px',
				render:(record) => datefmt(record,'yyyy-MM-dd')
			},
			{
				title:'操作',
				key:'action',
				width:'150px',
				render:(text) => (
					<span>
						<a onClick={(id)=>this.editHandle(text.Id)}>修改</a>
						<a onClick={(id) =>this.deleteHandle(text.Id)} style={{marginLeft:'15px'}}>删除</a>
					</span>
				)
			}
		];
		const modalChlidren = (
			<div>
				<AddMod wrappedComponentRef={(inst) => this.formRef = inst}
						showCurStus={showcurstus}
						showEditPwdChk={showeditpwdchk}
						editPwdDisabled={editpwddisabled}
						editPwdChkChange={this.editPwdChkChange}
				/>
			</div>
		);
		return (
			<div>
				<ButtonCustom onAdd={this.onAdd}
							  showBatchDelButton={true}
							  onBatchDel={this.onBatchDel}
							  dialogIsShow={showdialog}
							  showFooter={true}
							  dialogCancelFunc={this.dialogCancel}
							  dialogOkFunc={this.dialogOk}
							  dialogTitle={'添加'}
							  modalChildren={modalChlidren}
							  showBatchDelButton={showbatchdelbtn}
				/>
				<SearchCustom onSearch={this.onSearch} inputPlaceholder={'输入登录名查询'}/>
				<TableCustom columns={columns}
							 datasource={data}
							 hasborder={false}
							 isloading={isloading}
							 totalcount={totalcount}
							 pageSizeChange={this.pageSizeChange}
							 setRowKey={this.setRowKey}
							 showTotal={this.showTotal}
							 showSizeChange={this.showSizeChange}
							 showRowCheckbox={true}
							 rowSelectChange={this.rowSelectChange}
				/>
			</div>
		);
	}
}