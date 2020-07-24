import React, { Component } from 'react';
import './App.css';
import { postTodo, patchTodo, deleteTodo } from './helpers/functions'
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

    postTodo(newTodo)
  }

  updateTodo = (updatedTodo) => {
    let todos = this.state.todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)

    this.setState({todos})

    patchTodo(updatedTodo)
  }

  deleteTodo = (id) => {
    let filtered = this.state.todos.filter(todo => todo.id !== id)
    
    this.setState({
      todos: filtered
    })

    deleteTodo(id)
  }

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <TodoForm submitAction={this.addTodo} /> 
        <TodoContainer updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
