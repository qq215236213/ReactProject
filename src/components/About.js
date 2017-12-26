import React ,{Component} from 'react';
import  {connect} from 'react-redux'

class About extends Component{
	render(){
		const {onChangeTxt,text} = this.props;
		return (
			<div>
				<h1 onClick={onChangeTxt}>{text}</h1>
			</div>
		);
	}
}

//action
const changeTxt = {
	type:'CHANGE_TEXT'
}


//reducer
const initalState = {
		text : '关于'
};
const aboutReducer = (state = initalState,action)=>{
	switch (action.type){
		case 'CHANGE_TEXT':
			return {
				text : 'about'
			}
			default:
				return state;
	}
}


//映射
function mapStateToProps(state) {
	return {
		text:state.about.text
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onChangeTxt:()=> dispatch(changeTxt)
	}
}

//store
//let aboutStore = createStore(reducer);


About = connect(mapStateToProps,mapDispatchToProps)(About);

export {About,aboutReducer};


