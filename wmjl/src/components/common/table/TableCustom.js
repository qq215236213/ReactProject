import React , { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

export default class TableCustom extends Component{

	render(){
		const {
            /**table的数据源 类型：[]*/
			datasource,
            /**table的表头 类型：[]*/
			columns,
            /**table样式，是否有边框 类型：bool*/
			hasborder,
            /**table是否是加载状态 类型：bool*/
			isloading,
            /**数据的总记录数 类型：number*/
			totalcount,
            /**现实总记录数  类型：func 参数：total(总记录数)*/
			showTotal,
            /**table的key值，每一个table都需要 类型：func 参数：record(数据源)*/
			setRowKey,
            /**点击页码的事件 类型：func 参数：page(当前页码),pagesize(每页显示记录条数)*/
			pageSizeChange,
            /**每页显示记录条数按钮事件 类型：func 参数：page(当前页码),pagesize(每页显示记录条数)*/
			showSizeChange,
            /**每一行的checkbox 按钮事件 类型：func 参数：selectedRowKeys(选中记录条的id数组),selectedRows(选中记录条的数据数组)*/
			rowSelectChange,
            /**是否显示每一行的checkbox 类型：bool*/
			showRowCheckbox,
            /**每行的checkbox的特性 showRowCheckbox=true时有效 类型：func 参数：record(数据源) 返回一个对象，比如 {disabled:record.Id === 1}*/
			checkboxProps
		} = this.props;
		return (
			<div>
				<Table columns={columns}
					   bordered={hasborder}
					   loading={isloading}
					   locale={{emptyText:'暂无数据'}}
					   dataSource={datasource}
					   pagination={{total:totalcount,
						   			showSizeChanger:true,
						   			onChange:pageSizeChange,
						   			defaultPageSize:20,
						   			showTotal:showTotal,
						   			onShowSizeChange:showSizeChange}}
					   rowKey={setRowKey}
					   rowSelection={showRowCheckbox?{onChange:rowSelectChange,getCheckboxProps:checkboxProps}:null}
				/>
			</div>
		);
	}
}

TableCustom.propTypes = {
	datasource : PropTypes.array,
	columns:PropTypes.array,
	hasborder:PropTypes.bool,
	isloading:PropTypes.bool,
	totalcount:PropTypes.number,
	pageSizeChange:PropTypes.func,
	setRowKey:PropTypes.func,
	showTotal:PropTypes.func,
	showSizeChange:PropTypes.func,
	rowSelectChange:PropTypes.func,
	showRowCheckbox:PropTypes.bool,
    checkboxProps:PropTypes.func
}
