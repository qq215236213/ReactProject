import  React , { Component, PropTypes } from 'react';


class Footer extends Component{
	renderFilter(filter,name){
		if(filter === this.props.filter){
			return name;
		}

		return (
			<button onClick={e => {
				e.preventDefault();
				this.props.onFilterChange(filter);
			}}>
				{name}
			</button>
		);
	}

	render(){
		return (
			<p>
				Show:
				{'  '}
				{this.renderFilter('SHOW_ALL','All')}
				{', '}
				{this.renderFilter('SHOW_COMPLETED','Completed')}
				{', '}
				{this.renderFilter('SHOW_ACTIVE','Active')}
				.
			</p>
		);
	}
};

export default Footer;