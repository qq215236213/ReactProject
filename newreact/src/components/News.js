import React ,{	Component } from 'react';
import InputBox from '../components/common/InputBox';
import SearchText from './SearchText';


export default class News extends Component{
	constructor(props){
		super(props);
		this.state = {
			text:'hello world',
            searchTxt:''
		}
		this.changeTxt = this.changeTxt.bind(this);
		this.changeSearchTxt = this.changeSearchTxt.bind(this);
	}

	changeTxt(text){
		this.setState({text:text});
	}

	changeSearchTxt(txt){
		this.setState({searchTxt:txt});
	}

	componentDidMount(){
		console.log(111);
	}

	render(){
		return(
			<div>
                <label htmlFor="">{this.state.text}</label>
				<SearchText text={this.state.searchTxt}/>
				<InputBox cb={this.changeTxt} searchcb={this.changeSearchTxt}/>
			</div>
		);
	}
}