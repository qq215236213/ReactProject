import React ,{ Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default class Selecter extends Component{
	constructor(props){
		super(props);
		this.state = {
			load:false,
			count:0
		}
		this.refreshData = this.refreshData.bind(this);
	}
	refreshData(i){
		this.setState({
			load:!this.state.load,
			count:i
		});
		console.log(this.state.count)
	}

	render(){
		const {optionlist,/*defaultvalue,*/change} = this.props;
		let options = () =>{
			if(this.state.load){
				return optionlist.map((item,index) =>{
					return <Option key={index+item} value={item}>{item}</Option>
				});
			}else{
				return ['haha','heihei'].map((item,index) => {
					return <Option key={index+item} value={item}>{item}</Option>
				});
			}
		}
		return (
			<div>
				<Select style={{width:'120px'}}
						filterOption = {(input,option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						showSearch placeholder={'请选择'} optionFilterProp={'children'}
						onChange={ typeof change && change}>
					{options()}
				</Select>
			</div>
		);
	}
}