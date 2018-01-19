import React ,{	Component } from 'react';
import PropTypes from 'prop-types';
import InputBox from '../components/common/InputBox';
import SearchText from './SearchText';


export default class News extends Component{

	constructor(props){
		super(props);
		this.state = {
			text:'hello world',
            searchTxt:''
		}
		this.changeTxt = this.changeTxt.bind(this);<div></div>
		this.changeSearchTxt = this.changeSearchTxt.bind(this);
		this.onChangeHandle = this.changeSearchTxt.bind(this);
	}

	changeTxt(text){
		this.setState({
			text:text
		});
	}

	changeSearchTxt(txt){
		this.setState({
			searchTxt:txt
		});
	}

	onChangeHandle(txt){
		console.log(txt)
		this.setState({
			searchTxt:txt
		});
	}

	render(){
		return(
			<div>
                <label htmlFor="">{this.state.text}</label>
				<SearchText text={this.state.searchTxt} changeHandle={this.onChangeHandle}/>
				<InputBox cb={this.changeTxt} searchcb={this.changeSearchTxt}/>
			</div>
		);
	}
}
News.defaultProps = {
	text:''
}

News.propTypes = {
	text: PropTypes.string.isRequired,
	searchTxt:PropTypes.number
}
