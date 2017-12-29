import  React ,{ Component } from 'react';

export default class Demo extends Component{
	constructor(props){
		super(props);
		this.timer = null;
		this.state = {
			inputTime:'',
			pressSeconds:0,
			totalTime:0,
			message:[{
				in:'',
				out:''
			}],
		};
		this.inputFunc = this.inputFunc.bind(this);
	};

	inputFunc(e){
		const inputMsg = e.target.value;
		this.setState({
			inputTime:inputMsg
		});
	}

	mouseDownEvent(){
		if(!this.timer === null){
			return;
		}
		if(!(this.state.pressSeconds === 0)){
			this.setState()


		}
	}

	render(){
		let results = this.state.message.map((item,index) =>{
			return (
				<div key={index}>
					<p>您输入的时间为:{item.in}s</p>
					<p>您实际的耗时为:{item.out}s</p>
				</div>
			);
		})
		return (
			<div>
				<p>请输入要测的时间
					<input type="text" value={this.state.inputTime} onChange={this.inputFunc}/>
				</p>
				<h1>
					请按住{this.state.inputTime}秒
				</h1>
				{results}
			</div>
		);
	};
}