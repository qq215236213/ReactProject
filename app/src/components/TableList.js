import React ,{ Component } from 'react';
import {Table} from 'antd';
import AddInput from './common/AddInput';
import EditableCell from './common/EditableCell';

export default class TableList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[
                {name:'jim',id:1},
                {id:2,name:'lucy'},
                {name:'john',id:3}
            ],
            value:''
        };
        this.columns = [
            {
                title:'序号',
                dataIndex:'id',
                key:'id',
                width:'120px'
            },
            {
                title:'姓名',
                dataIndex:'name',
                key:'name',
                render:(text,record) =>{
                    return (
                        <EditableCell
                            value={record.name}
                            onChange={this.onCellChange(record.id,'name')}
                        />
                    );
                }
            },
            {
                title:'操作',
                key:'action',
                width:'150px',
                render:(text,record) => {
                    return (
                        <span>
                            <a onClick={() => this.deleteEvent(record.id)}>删除</a>
                        </span>
                    );
                }
            }
        ];
        this.changeEvent = this.changeEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.onCellChange = this.onCellChange.bind(this);
        this.onRowSelectChange = this.onRowSelectChange.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
    }

    onCellChange(id,dataIndex){
        return (value) => {
            const dataSource = [...this.state.data];
            const target = dataSource.find(item => item.id === id);
            if(target){
                target[dataIndex] = value;
                this.setState({date:dataSource});
            }
        }
    }

    deleteEvent(id){
        const newData = this.state.data.filter((item,index) => {
            return item.id !== id;
        });
        this.setState({
            data:newData
        });
    }

    addEvent(){
        const newData = this.state.data;
        const id = newData.length + 1;
        newData.push({id:id,name:this.state.value});
        this.setState({id,
            data:newData,
            value:''
        });
    }

    changeEvent(e){
        this.setState({
           value:e.target.value
        });
    }

    onRowSelectChange(selectedRowKeys, selectedRows){
        console.log(selectedRows);
    }

    onRowSelect(changeableRowKeys){
        console.log(changeableRowKeys);
    }

    /*onChange:this.onRowSelectChange,selections:{onSelect:this.onRowSelect}*/
    render(){
        return (
            <div>
                <AddInput onClick={this.addEvent} value={this.state.value} onChange={this.changeEvent} />
                <Table rowKey={(record) => record.id} bordered dataSource={this.state.data} columns={this.columns}
                        /*title={(currentPageData) => {console.log(currentPageData)}}*/
                       rowSelection={{onChange:this.onRowSelectChange}}
                       locale={{emptyText:'暂无数据'}}
                        />
            </div>
        );
    }
}