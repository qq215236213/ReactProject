export const aboutReducer = (state = {
	text:'显示数据',
	isShow:false
},action)=>{
	switch (action.type){
		case 'CHANGE_TEXT':
			if(state.text === '哈哈'){
				return Object.assign({},state,{text:'嘿嘿'});
			}
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


export const homeReducer = (state={text:'Hello'},action) =>{
	switch (action.type){
		case 'CHANGE_TEXT':
			return {
				text:state.text === 'Hello'?'World':'Hello'
			}
		case 'BUTTON_CLICK':
			return {
				text:'Hello World'
			}
		default:
			return state;
	}
}
