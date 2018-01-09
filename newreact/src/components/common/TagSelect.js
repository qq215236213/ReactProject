import React ,{ Component } from 'react';
import { Select } from 'antd';

export default class TagSelect extends Component{
	render(){
		const {change} = this.props;
		const children = [];
		return (
			<div>
				<Select mode={'tags'} style={{width:'120px'}} placeholder={'Tags'} onChange={change}>
					{children}
				</Select>
			</div>
		);
	}
}