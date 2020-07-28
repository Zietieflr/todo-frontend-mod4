import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import { postTodo, patchTodo, deleteTodo } from './helpers/functions'
import TodoContainer from './components/TodoContainer'
import TodoForm from './components/TodoForm'
import SignupForm from './components/SignupForm'
import PrivateRoute from './components/PrivateRoute'
import Home from './Home';
const todosURL = "http://localhost:3000/todos"

class App extends Component {
  
  state = {
    todos: [],
    user: {},
    alerts: [],
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

  signUp = (user) => {
    return fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user})
    })
      .then(response => response.json())
      .then(response => {
        if (response.errors) {
          this.setState({alerts: response.errors})
        }
        else {
          localStorage.setItem('token', response.token)
          this.setState({
            user: response.user,
            alerts: ['User successfully created!']
          })
        }
      })
  }

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <Switch>
          <PrivateRoute 
            exact
            path='/' 
            component={Home} 
            submitAction={this.addTodo}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
            todos={this.state.todos}
          />
          <Route path='/signup' render={(routerProps) =>{
            return <SignupForm {...routerProps} signUp={this.signUp} alerts={this.state.alerts} /> }}
          />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
