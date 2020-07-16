import React, { Component } from 'react';
import './App.css';
import TodoContainer from './components/TodoContainer'
const todosURL = "http://localhost:3000/todos"

class App extends Component {
  
  state = {
    todos: [],
  }

  componentDidMount(){
    this.getTodos()
  }

  getTodos() {
    fetch(todosURL)
      .then(response => response.json())
      .then(results => this.setState({
        todos: results,
      }) )
  }

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <TodoContainer todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
