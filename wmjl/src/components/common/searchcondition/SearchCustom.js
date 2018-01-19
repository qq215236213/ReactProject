import React ,{ Component } from 'react';
import {Select,DatePicker,Input} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Search = Input.Search;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

export default class SearchCustom extends Component{
	render(){
		const {selectOpts,selectDefault,showDatePicker,showSelect,selectWidth,onSearch,datePickerChange,selectChange,inputPlaceholder} = this.props;
		const opts = selectOpts && selectOpts.map((item,index)=>{
			return (
				<Option key={index} value={item.value}>{item.text}</Option>
			);
		})
		return (
			<React.Fragment>
				<div style={{marginBottom:'10px',float:'right'}}>
					<Search
						placeholder= {inputPlaceholder || '输入关键字查询'}
						onSearch={onSearch}
						style={{ width: '220px' }}
						enterButton
					/>
				</div>
				<div style={{marginBottom:'10px',float:'right',marginRight:'5px',display:showSelect?'block':'none'}}>
					<Select style={{width:selectWidth||'240px'}}
							defaultValue={selectDefault}
							onChange={selectChange}
					>
						{opts}
					</Select>
				</div>
				<div style={{marginBottom:'10px',float:'right',marginRight:'5px',display:showDatePicker?'block':'none'}}>
					<RangePicker placeholder={['开始日期', '结束日期']}
								 style={{width:'220px'}}
								 onChange={datePickerChange}/>
				</div>
				<div style={{clear:'both'}}></div>
			</React.Fragment>
		);
	}
}

SearchCustom.propTypes = {
	selectOpts:PropTypes.array,
	selectDefault:PropTypes.string,
	showDatePicker:PropTypes.bool,
	showSelect:PropTypes.bool,
	selectWidth:PropTypes.number,
	onSearch:PropTypes.func,
	datePickerChange:PropTypes.func,
	selectChange:PropTypes.func,
	inputPlaceholder:PropTypes.string
}