import React ,{Component} from 'react';
import  {connect} from 'react-redux'
import PropTypes from 'prop-types';
import FormList from './FormList';
import {changeTxt} from './redex/action';

class About extends Component{
	constructor(props,context){
		super(props,context);
		this.onChangeTxt = this.onChangeTxt.bind(this);
	}

	onChangeTxt(){
		const {store} = this.context;
		store.dispatch(changeTxt);
	}

	render(){
		const { text } = this.props;
		/*const {store} = this.context;
		console.log(store)*/
		return (
			<div>
				<h1 onClick={this.onChangeTxt}>{text}</h1>
				<FormList data={this.props}/>
			</div>
		);
	}
}


//reducer
/*
const aboutReducer = (state = {
	text:'显示数据',
	isShow:false
},action)=>{
	switch (action.type){
		case 'CHANGE_TEXT':
				return Object.assign({},state,{text:'哈哈'});
			case 'SHOWTEXT':
				if(state.isShow){
					return Object.assign({},state,{isShow:false});
				}
				return Object.assign({},state,{isShow:true});
			default:
				return state;
	}
}
*/


//映射
function mapStateToProps(state) {
	return {
		text:state.about.text,
		isShow:state.about.isShow
	}
}


/*function mapDispatchToProps(dispatch) {
	return {
		onChangeTxt:()=> dispatch(changeTxt)
	}
}*/

//store
//let aboutStore = createStore(reducer);

About.contextTypes = {
	store:PropTypes.object.isRequired
}

About = connect(mapStateToProps)(About);

// export {About,aboutReducer};
export default About;

