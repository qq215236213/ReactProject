import React , { Component } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';

export default class TestApp extends Component{
	render(){
		return (
			<div>
				<AddTodo onAddClick={text => console.log('add todo',text)}/>
				<TodoList onTodoClick={ todo =>
					console.log('todo clicked',todo)
				} todos={[
					{
						text:'Use Redux',
						completed:true
					},
					{
						text:'Learn to connect it to React',
						completed:false
					}
				]}/>
				<Footer onFilterChange={ filter => console.log('filter change',filter)} filter='SHOW_ALL'/>
			</div>
		);
	}
}
