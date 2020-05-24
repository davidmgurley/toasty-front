import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
import NewListForm from './components/NewListForm'
import './App.css'
import './Styles.css'

const App = props => {

  const [showForm, setShowForm] = useState(false)
  const [todoTitleValue, setTodoTitleValue] = useState('')
  const [todoDescriptionValue, setTodoDescriptionValue] = useState('placeholder')
  const [todoList, setTodoList] = useState([])

  const setShowFormHandler = () => {
    showForm ? setShowForm(false) : setShowForm(true)
  }

  const updateFormTitleHandler = event => {
    setTodoTitleValue(event.target.value)
  }

  const updateFormDescriptionHandler = event => {
    setTodoDescriptionValue(event.target.value)
  }

  const submitFormHandler = () => {
        if (todoTitleValue === '') {
        console.log('error')
    }
    else {
        const newListItem = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ title: todoTitleValue, description: todoDescriptionValue, position: todoList.length + 1})
        }
        fetch('https://cors-anywhere.herokuapp.com/https://toasty-todo.herokuapp.com/api/v1/todos', newListItem)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch.')
          }
          return response.json()
        })
        .then(newListItem => {
          console.log(newListItem)
          getTodoList()
        })
    }
  }

  const getTodoList = () => {
    fetch('https://cors-anywhere.herokuapp.com/https://toasty-todo.herokuapp.com/api/v1/todos')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch.')
      }
      return response.json()
    })
    .then(todoListItems => {
      setTodoList(todoListItems.data)
    })
  }

  const deleteItem = event => {
    const deleteRequest = {
      method: 'DELETE'
    }
    fetch('https://cors-anywhere.herokuapp.com/https://toasty-todo.herokuapp.com/api/v1/todos/' + event.currentTarget.id, deleteRequest)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete.')
      }
      return response.json()
    })
    .then(deletedListItem => {
      console.log(deletedListItem)
      getTodoList()
    })

  }

  const listDragUpdate = event => {
    console.log(event.oldIndex)
  }

  let content = (
    <React.Fragment>
      <Header totalTodos={todoList.length}/>
      <TodoList 
        getTodoList={getTodoList}
        deleteItem={deleteItem}
        listDragUpdate={listDragUpdate}
        setTodoList={setTodoList}
        todoList={todoList}/>
      <NewListForm
        onSetShowForm={setShowFormHandler}
        updateFormTitleValue={updateFormTitleHandler}
        updateFormDescriptionValue={updateFormDescriptionHandler}
        submitForm={submitFormHandler}
        showForm={showForm}
        todoTitleValue={todoTitleValue}
        todoDescriptionValue={todoDescriptionValue}
        />
    </React.Fragment>
  )

  return content
}

export default App;
