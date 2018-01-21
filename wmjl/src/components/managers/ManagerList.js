import React,{ Component } from 'react';
import TableCustom from '../common/table/TableCustom';
import SearchCustom from '../common/searchcondition/SearchCustom';
import ButtonCustom from '../common/actionbutton/ButtonCustom';
import Add from './Add';
import Mod from './Mod';
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
			data:[],/**数据*/
            totalcount:0, /**数据的总记录数*/
            batchdelids:[],/**多选框选中的记录*/
            searchTxt:'',/**查询关键字*/
            pageindex:1,/**当前页码*/
            pagesize:10,/**每页显示记录条数*/
			isloading:false,/**是否正在加载数据*/
			showdialog:false,/**是否显示modal对话框*/
			showbatchdelbtn:false,/**是否显示批量删除按钮*/
            isedit:false, /**是否是编辑，用于区分加载对话框的内容*/
            managerid:0, /**用于标记修改的是哪条数据*/
            editdata:{}/**获取明细*/
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
		this.checkboxProps = this.checkboxProps.bind(this);
	}

	/**
	 * 查询框查询按钮事件*/
	onSearch(value){
		this.setState({
			searchTxt:value
		});
		this.loadData({loginname:value});
	}

	/**行checkbox的特性*/
    checkboxProps(record){
		return {disabled:record.Id === 1};
	}

	/**
	 * 翻页*/
	pageSizeChange(page,pagesize){
		this.setState({
			pageindex:page,
			pagesize:pagesize
		});
		this.loadData({pageindex:page,pagesize:pagesize});
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
		this.setState({
			pageindex:page,
			pagesize:pagesize
		});
		this.loadData({pageindex:page,pagesize:pagesize});
	}
	/**
	 * checkbox 按钮事件*/
	rowSelectChange(selectedRowKeys,selectedRows){
		const lenght = selectedRowKeys.length;
		if(lenght === 0){
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
			disabled:true,
            isedit:true,
            managerid:id
		});
		this.getManager(id);
	}
	/**
	 * 删除按钮事件*/
	deleteHandle(id){
		const _this = this;
		tipMsg('提示','确定删除选中记录的吗?',function () {
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
			disabled:false,
            isedit:false
		});
	}

	/**
	 * 批量删除按钮事件*/
	onBatchDel(){
		const _this = this;
		tipMsg('提示','确定要删除吗？',()=>{
            $.post('/manager/batchdel',{ids:this.state.batchdelids,accesstoken:cookie('token')},function (d) {
                if(d.IsError){
                    message.error(d.Msg);
                    return;
                }
                message.success('删除成功');
                _this.setState({showbatchdelbtn:false});
                _this.loadData();
            });
		});
	}

	/**
	 * modal对话框取消事件*/
	dialogCancel(){
		this.setState({showdialog:false});
	}

	/**
	 * modal对话框确定事件*/
	dialogOk(){
		const {form} = this.formRef.props;
		form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }

			console.log(values);
            /**验证两次输入的密码是否一致*/
            /*if(values.password !== values.confirmpassword){
            	form.setFields({
                    confirmpassword:{
                    	value:values.confirmpassword,
                    	errors:[new Error('两次输入的密码不一致')]
					}
				});
			}*/

            if(this.state.isedit){
            	if(values.editchk){
                    if(values.password !== values.confirmpassword) {
                        form.setFields({
                            confirmpassword: {
                                value: values.confirmpassword,
                                errors: [new Error('两次输入的密码不一致')]
                            }
                        });
						return ;
                    }
				}
				let params = {};
                params.id = this.state.managerid;
                params.issystemmanager = '1' === values.issystem ? true : false;
                params.curstatus = values.curstatus;
				if(values.editchk){
					params.loginpwd = md5(values.password);

				}
				this.updateManager(params);
			}else{
                const params = {
                    loginname: values.loginname,
                    loginpwd: md5(values.password),
                    accesstoken: cookie('token'),
                    issystemmanager: '1' === values.issystem ? true : false
                }
                this.addManager(params);
			}
        });

	}

	/**更新数据*/
	updateManager(params){
		const _this = this;
        const param = Object.assign({},{accesstoken:cookie('token')},params);
        $.post('/manager/'+params.id, param, function (d) {
            if (d.IsError) {
                message.error(d.Msg);
                return;
            }
            _this.loadData();
            _this.setState({showdialog: false});
        });
	}

	/**新增数据*/
	addManager(params){
        const _this = this;
		const param = Object.assign({},{accesstoken:cookie('token')},params);
        $.post('/manager', param, function (d) {
            if (d.IsError) {
                message.error(d.Msg);
                return;
            }
            _this.loadData();
            _this.setState({showdialog: false});
        });
	}

	/**获取一条明细*/
	getManager(id){
		const _this = this;
		if(id === null || typeof id === 'undefined' || id===0){
			message.error('获取明细失败');
			return;
		}
		$.get('/manager/'+id,{accesstoken:cookie('token')},function (d) {
			if(d.IsError){
				message.error(d.Msg);
				return;
			}
            _this.setState({editdata:d.Data});
        });
	}

	/**
	 * 加载数据*/
	loadData(params){
		const _this = this;
		const param = Object.assign({},{
			pagesize:this.state.pagesize,
			pageindex:this.state.pageindex,
			loginname:this.state.searchTxt,
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
		const {data,isloading,totalcount,showdialog,editdata,
			showbatchdelbtn,isedit} = this.state;
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
				render:(record) =>record === 0
								?
								<span style={{color:'green'}}>正常</span>
								:
								<span style={{color:'red'}}>禁用</span>
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
					text.Id === 1
						?
						<span>
							<a onClick={(id)=>this.editHandle(text.Id)}>修改</a>
						</span>
						:
						<span>
							<a onClick={(id)=>this.editHandle(text.Id)}>修改</a>
							<a onClick={(id) =>this.deleteHandle(text.Id)} style={{marginLeft:'15px'}}>删除</a>
						</span>
				)
			}
		];
		const modalChlidren = (
				isedit
				?
				<div>
					<Mod wrappedComponentRef={(inst) => this.formRef = inst } data={editdata} needValidCheck={false}/>
				</div>
				:
				<div>
					<Add wrappedComponentRef={(inst) => this.formRef = inst} />
				</div>
		);
		return (
			<div>
				<ButtonCustom onAdd={this.onAdd}
                              addIcon={'user-add'}
							  showBatchDelButton={showbatchdelbtn}
                              batchDelIcon={'usergroup-delete'}
							  onBatchDel={this.onBatchDel}
							  dialogIsShow={showdialog}
							  showFooter={true}
							  dialogCancelFunc={this.dialogCancel}
							  dialogOkFunc={this.dialogOk}
							  dialogTitle={'添加'}
							  modalChildren={modalChlidren}
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
                             checkboxProps={this.checkboxProps}
				/>
			</div>
		);
	}
}