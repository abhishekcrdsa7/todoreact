import React, { Component } from 'react';

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTodo: ''
        };
        this.onTextChange = this.onTextChange.bind(this);
    }
    onTextChange(e) {
        this.setState({
            newTodo: e.target.value
        });
        
    }
    
    render() {
        return (
            <div>
                <input type="text" value={this.state.newTodo} onChange={this.onTextChange}/>
                <button onClick={(e) => {
                this.props.addTodo(this.state.newTodo);
                this.setState({newTodo: ''});
                }}>AddTodo</button>
            </div>
            );
    }
}

export default TodoForm;