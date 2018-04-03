/* global fetch*/
/*global Headers*/
import React, { Component } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
class TodoList extends Component {
    constructor() {
        super();
        this.state = undefined;
        this.addTodo = this.addTodo.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onToggle = this.onToggle.bind(this);
        }
    
    componentDidMount() {
        fetch("/api/todos")
        .then(data => data.json())
        .then(todos => {
            this.setState({todos});
        })
        
    }
    
    onToggle(todo) {
        fetch(`/api/todos/${todo._id}`,{
            method: "PUT",
             headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({completed: !todo.completed})
        })
        .then(() => {
            const arr = this.state.todos.map((d) => {
                if(d._id === todo._id){
                    return {...todo,completed: !todo.completed};
                }else{
                    return d;   
                }
            })
            this.setState({todos: arr});
        });
    }
    
    onDelete(id) {
        fetch(`/api/todos/${id}`,{
            method: "DELETE",
        })
        .then(() => {
            const arr = this.state.todos.filter((d) => {return d._id !== id});
            this.setState({todos: arr});
        });
    }
    
    addTodo(name) {
        fetch("/api/todos",{
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({name})
        })
        .then(data => data.json())
        .then(newTodo => {
            this.setState({todos: [...this.state.todos,newTodo]});
        })
    }
    
    render() {
        let todos;
        if(this.state){
            todos = this.state.todos.map((data) => <TodoItem key={data._id} {...data} todo={data} delete={this.onDelete} onToggle={this.onToggle}/>);    
        }else{
            todos = "LOADING";
        }
        
        return (
            <div>
                <h1>TodoList!</h1>
                <TodoForm addTodo={this.addTodo}/>
                <ul>
                   {todos}
                </ul>
            </div>
        );
    }
}
export default TodoList;