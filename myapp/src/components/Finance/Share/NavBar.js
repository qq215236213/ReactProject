import React , {Component} from 'react';

class NavBar extends Component{

	render(){
		if(this.props.first==='1'){
			return(
				<ul className='nav nav-tabs'>
					<li className='active'>
						<a href="/finance/sharermb">人民币分红</a>
					</li>
					<li>
						<a href="/finance/share">虚拟币分红</a>
					</li>
				</ul>
			);
		}else {
			return(
				<ul className='nav nav-tabs'>
					<li>
						<a href="/finance/sharermb">人民币分红</a>
					</li>
					<li className='active'>
						<a href="/finance/share">虚拟币分红</a>
					</li>
				</ul>
			);
		}
	}
}

export default NavBar;