import React,{Component} from 'react';

class Title extends Component{
	render(){
		return (
			<div style={{padding:'10px 10px 5px 20px'}}>
				<h3>{this.props.title}</h3>
			</div>
		);
	}
}

export default Title;