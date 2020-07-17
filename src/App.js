import React, { Component } from 'react';
import './App.css';
import TodoContainer from './components/TodoContainer'
import TodoForm from './components/TodoForm'
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

  addTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    })

    fetch(todosURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
  }

  deleteTodo = (id) => {
    let filtered = this.state.todos.filter(todo => todo.id !== id)
    
    this.setState({
      todos: filtered
    })

    fetch(todosURL + `/${id}`, {method: 'DELETE'})
  }

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <TodoForm addTodo={this.addTodo} /> 
        <TodoContainer deleteTodo={this.deleteTodo} todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
