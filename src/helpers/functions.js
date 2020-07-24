const todosURL = 'http://localhost:3000/todos/'

export function patchTodo(todo) {
  fetch(todosURL + todo.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({todo})
  })
}

export function postTodo(todo) {
  fetch(todosURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({todo})
  })
}

export function deleteTodo(id){
  fetch(todosURL + id, {method: 'DELETE'})
}