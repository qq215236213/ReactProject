import React , { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

export default class TableCustom extends Component{

	render(){
		const {datasource,columns,hasborder,isloading,totalcount,showTotal,setRowKey,pageSizeChange,showSizeChange,rowSelectChange,showRowCheckbox} = this.props;
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
					   rowSelection={showRowCheckbox?{onChange:rowSelectChange}:null}
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
	showRowCheckbox:PropTypes.bool
}
