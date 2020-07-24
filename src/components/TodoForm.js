import React, { Component } from 'react'


const initialState = {
  title: '',
  content: '',
  urgent: false,
  done: false, 
}

export default class TodoFrom extends Component {

  state = initialState

  componentDidMount() {
    const {todo} = this.props 
    if (this.props.todo){
      const {id, title, content, urgent, done} = todo
      this.setState({
        id,
        title,
        content,
        urgent,
        done,
      })
    }
  }

  handleChange = (event) => {
    let {name, value, checked} = event.target
    
    value = (name === 'urgent') || (name === 'done') ? checked : value
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.submitAction(this.state)
    this.setState(initialState)
    if (this.props.handleToggle) {
      this.props.handleToggle()
    }
  }

  showDoneCheckbox = () => {
    return this.props.todo
      ? (
        <div className='input-group'>
          <label>Done</label>
          <input
            type='checkbox'
            name='done'
            checked={this.state.done}
            onChange={this.handleChange}
          />
        </div>
      ) 
      : null
  }

  showCloseButton = () => {
    return this.props.todo
      ? <button className='close-button' onClick={this.props.handleToggle}>CLOSE FORM</button>
      : null
  }
  
  render() {
    const {title, content, urgent} = this.state
    return (
      <form className='todo-form' onSubmit={event => this.handleSubmit(event)}>
        {this.props.todo ? <h2>Edit Todo</h2> : <h2>Create A New Todo</h2>}
        <label>Title</label>
        <input type='text' name='title' value={title} onChange={this.handleChange} />
        <label>Content</label>
        <input type='text' name='content' value={content} onChange={this.handleChange} />
        <div className='urgent-input'>
          <label>Urgent</label>
          <input type='checkbox' name='urgent' checked={urgent} onChange={this.handleChange} />
        </div>
        {this.showDoneCheckbox()}
        <input type='submit' />
        {this.showCloseButton()}
      </form>
    )
  }
}