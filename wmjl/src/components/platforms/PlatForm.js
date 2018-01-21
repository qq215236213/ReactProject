import React ,{Component} from 'react';
import TableCustom from '../common/table/TableCustom';
import {datefmt} from "../common/dateformat";
import $ from 'jquery';
import {cookie} from "../common/cookie";
import {message} from 'antd';
import SearchCustom from '../common/searchcondition/SearchCustom';
import ButtonCustom from '../common/actionbutton/ButtonCustom';
import {tipMsg} from "../common/confirm/confirm";
import Add from './Add';
import Detail from './Detail';
import Mod from './Mod';

class PlatForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloading:false,
            data:[],
            totalcount:0,
            pageindex:1,
            pagesize:10,
            searchtxt:'',
            dialogisshow:false,
            dialogtitle:'新增',
            flag:0,/**用于标识当前是新增(0)还是详情(1)或者是修改(2)*/
            showfooter:true,
            detaildata:{}
        };
        this.editHandle = this.editHandle.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
        this.setRowKey = this.setRowKey.bind(this);
        this.showTotal = this.showTotal.bind(this);
        this.pageSizeChange = this.pageSizeChange.bind(this);
        this.sizeChange = this.sizeChange.bind(this);
        this.viewHandle = this.viewHandle.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.cancelFunc = this.cancelFunc.bind(this);
        this.okFunc = this.okFunc.bind(this);
    }
    viewHandle(id){
        $.get('/platform/'+id,{accesstoken:cookie('token')},(d)=>{
            if(d.IsError){
                message.error(d.Msg);
                return;
            }
            this.setState({
                flag:1,
                dialogisshow:true,
                dialogtitle:'详情',
                showfooter:false,
                detaildata:d.Data || []
            });
        })
    }
    editHandle(id){
        $.get('/platform/'+id,{accesstoken:cookie('token')},(d)=>{
            if(d.IsError){
                message.error(d.Msg);
                return;
            }
            this.setState({
                flag:2,
                dialogisshow:true,
                dialogtitle:'修改',
                showfooter:true,
                detaildata:d.Data || []
            });
        })
    }
    deleteHandle(id){
        tipMsg('提示','确定删除吗?',()=>{
            $.post('/platform/delete/'+id,{accesstoken:cookie('token')},(d) =>{
                if(d.IsError){
                    message.error(d.Msg);
                    return;
                }
                message.success('删除成功');
                this.loadData();
            })
        })
    }
    setRowKey(record){
        return record.RecId;
    }
    showTotal(total){
        return `总记录：${total}条`;
    }
    pageSizeChange(page,pagesize){
        this.setState({
            pageindex:page,
            pagesize:pagesize
        },()=>{
            this.loadData();
        })
    }
    sizeChange(page,pagesize){
        this.setState({
            pageindex:page,
            pagesize:pagesize
        },()=>{
            this.loadData();
        })
    }
    onSearch(value){
        this.setState({
            searchtxt:value
        },()=>{
            this.loadData();
        });
    }
    onAdd(){
        this.setState({
            dialogisshow:true,
            flag:0,
            showfooter:true
        });
    }
    cancelFunc(){
        this.setState({
            dialogisshow:false
        });
    }
    okFunc(){
        const {form} = this.formRef.props;
        form.validateFieldsAndScroll((err,values)=>{
           if(err){
               return;
           }
            if(this.state.flag == 0){
               this.createData(values);
            }else if(this.state.flag == 2){
               this.updataData(values);
            }
        });
    }
    createData(params){
        const param = Object.assign({},{accesstoken:cookie('token')},params);
        $.post('/platform',param,(d)=>{
            if(d.IsError){
                message.error(d.Msg);
                return;
            }
            message.success('添加成功');
            this.loadData();
            this.setState({
                dialogisshow:false
            });
        });
    }
    updataData(params){
        const param = Object.assign({},{accesstoken:cookie('token')},params);
        if(param.isstop == 0)
            param.isstop = false;
        else
            param.isstop = true;
        $.post('/platform/'+param.recid,param,(d)=>{
            if(d.IsError){
                message.error(d.Msg);
                return;
            }
            message.success('添加成功');
            this.loadData();
            this.setState({
                dialogisshow:false
            });
        });
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(params){
        this.setState({isloading:true});
        const param = Object.assign({},{
            accesstoken:cookie('token'),
            pageindex:this.state.pageindex,
            pagesize:this.state.pagesize,
            platformname:this.state.searchtxt
        },params);
        $.get('/platform',param,(d)=>{
            if(d.IsError){
                message.error(d.Msg);
                return;
            }
            this.setState({
                data:d.Data.Collection || [],
                totalcount:d.Data.TotalCount,
                isloading:false
            });
        });
    }
    render(){
        const {isloading,data,totalcount,dialogisshow,dialogtitle,flag,showfooter,detaildata} = this.state;
        const columns = [
            {
                title:'平台编号',
                dataIndex:'PlatformCode',
                width:'120px'
            },
            {
                title:'平台名称',
                dataIndex:'PlatformName',
            },
            {
                title:'是否停用',
                dataIndex:'IsStop',
                render:(record) => {
                    if(record){
                        return <span style={{color:'red'}}>√</span>
                    }
                }
            },
            {
                title:'创建时间',
                dataIndex:'CreateTime',
                width:'120px',
                render:(record) => datefmt(record,'yyyy-MM-dd')
            },
            {
                title:'操作',
                key:'action',
                width:'200px',
                render:(record) =>
                        <span>
                            <a onClick={(id)=>this.viewHandle(record.RecId)}>详情</a>
							<a onClick={(id)=>this.editHandle(record.RecId)} style={{marginLeft:'15px'}}>修改</a>
							<a onClick={(id) =>this.deleteHandle(record.RecId)} style={{marginLeft:'15px'}}>删除</a>
						</span>
            }
        ];
        const modalChildren = () =>{
            if(flag === 0){
                return <Add wrappedComponentRef={(inst) => this.formRef = inst} />
            }else if(flag === 1){
                return <Detail wrappedComponentRef={(inst) => this.formRef = inst} data={detaildata} />
            }else if(flag ===2){
                return <Mod wrappedComponentRef={(inst) => this.formRef = inst} data={detaildata}/>
            }
        }

        return (
            <div>
                <ButtonCustom onAdd={this.onAdd}
                              addIcon={'plus'}
                              dialogIsShow={dialogisshow}
                              showFooter={showfooter}
                              dialogCancelFunc={this.cancelFunc}
                              dialogTitle={dialogtitle}
                              dialogOkFunc={this.okFunc}
                              modalChildren={modalChildren()}

                />
                <SearchCustom inputPlaceholder={'输入关键字查询'}
                              onSearch={this.onSearch}
                />
                <TableCustom columns={columns}
                             totalcount={totalcount}
                             datasource={data}
                             setRowKey={this.setRowKey}
                             showTotal={this.showTotal}
                             showSizeChange={this.sizeChange}
                             pageSizeChange={this.pageSizeChange}
                             isloading={isloading}
                />
            </div>
        );
    }
}

export default PlatForm;