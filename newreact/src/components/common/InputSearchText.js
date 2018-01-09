import React , { Component } from 'react';
import { Select } from 'antd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
const Option = Select.Option;

let timeout;
let currentValue;
const fetch = (value,callback) => {
	if(timeout){
		clearTimeout(timeout);
		timeout = null;
	}
	currentValue = value;

	function fake(){
		const str = querystring.encode({
			code:'utf-8',
			q:value
		});

		jsonp(`https://suggest.taobao.com/sug?${str}`)
			.then(response => response.json())
			.then((d) => {
				if(currentValue === value){
					const result = d.result;
					const data = [];
					result.forEach((r) =>{
						data.push({
							value:r[0],
							text:r[0]
						});
					});
					callback(data);
				}
			});
	}

	timeout = setTimeout(fake,300);
}

export default class InputSearchText extends Component{
	constructor(props){
		super(props);
		this.state = {
			value:'',
			data:[]
		};
		this.changeText = this.changeText.bind(this);
		this.searchText = this.searchText.bind(this);
	}

	changeText(value,callback){
		this.setState({
			value
		});
		fetch(value,data => this.setState({data}));
		typeof callback === 'function' && callback(value);
	}

	searchText(value,callback){
		typeof callback === 'function' && callback(value);
	}

	render(){
		const options = this.state.data.map((item,index) =>{
			return (
				<Option key={item.value}>{item.text}</Option>
			);
		});
		const {placeholder,style,callback} = this.props;
		return (
			<Select
			   	mode={'combobox'}
			    placeholder={placeholder}
			    value={this.state.value}
				style={style}
			    defalutActiveFirstOption={false}
				showArrow={false}
			    filterOption={false}
				onChange={(value) =>this.changeText(value,callback)}
			>
				{options}
			</Select>
		);
	}
}