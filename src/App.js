import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
import NewListForm from './components/NewListForm'
import './App.css'
import './Styles.css'

const App = props => {

  const [todoTitleValue, setTodoTitleValue] = useState('')
  const [showError, setShowError] = useState(false)
  const [todoDescriptionValue, setTodoDescriptionValue] = useState('placeholder')
  const [todoList, setTodoList] = useState([])

  const updateFormTitleHandler = event => {
    setTodoTitleValue(event.target.value)
  }

  const updateFormDescriptionHandler = event => {
    setTodoDescriptionValue(event.target.value)
  }

  const submitFormHandler = () => {
        if (todoTitleValue === '') {
          setShowError(true)
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
        setTodoTitleValue('')
        setShowError(false)
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
      <div className='mainContainer'>

      <div className='leftColumn'>
      <Header totalTodos={todoList.length}/>
      <NewListForm
        updateFormTitleValue={updateFormTitleHandler}
        updateFormDescriptionValue={updateFormDescriptionHandler}
        submitForm={submitFormHandler}
        todoTitleValue={todoTitleValue}
        todoDescriptionValue={todoDescriptionValue}
        showError={showError}
        />
      </div>
      <div className='rightColumn'>
      <TodoList 
        getTodoList={getTodoList}
        deleteItem={deleteItem}
        listDragUpdate={listDragUpdate}
        setTodoList={setTodoList}
        todoList={todoList}/>
      </div>
      </div>
    </React.Fragment>
  )

  return content
}

export default App;
