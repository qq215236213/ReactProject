import React ,{	Component } from 'react';
import InputBox from '../components/common/InputBox';


export default class News extends Component{
	constructor(props){
		super(props);
		this.state = {
			text:'hello world'
		}
		this.changeTxt = this.changeTxt.bind(this);
	}

	changeTxt(text){
		this.setState({text:text});
	}

	render(){
		return(
			<div>
                <label htmlFor="">{this.state.text}</label>
				<InputBox cb={this.changeTxt}/>
			</div>
		);
	}
}