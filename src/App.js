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
  const [filteredList, setFilteredList] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [editOpen, setEditOpen] = useState(false)
  const [editItemId, setEditItemId] =useState('')
  const [editItemValue, setEditItemValue] = useState('')
  const [sortIndex, setSortIndex] = useState('')

  const updateFormTitleHandler = event => {
    setTodoTitleValue(event.target.value)
  }

  const setSearchValueHandler = event => {
    setSearchValue(event.target.value)
    let searchInput = event.target.value.trim().toLowerCase();
    if (searchInput.length > 0) {
      setIsSearching(true)
      setFilteredList(todoList.filter(val => val.title.toLowerCase().match(searchInput)))
    }
    else {
      setFilteredList(todoList) 
      setIsSearching(false)
    }
  }

  const setComplete = event => {
    const newListItem = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ completed: 'complete'})
    }
    fetch('https://toasty-todo.herokuapp.com/api/v1/todos/' + event.currentTarget.id, newListItem)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to complete.')
      }
      return response.json()
    })
    .then(completedListItem => {
      console.log(completedListItem)
      getTodoList()
    })
  }

  const editItemSubmitHandler = () => {
    const newListItem = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ title: editItemValue})
    }
    console.log(newListItem)
    fetch('https://toasty-todo.herokuapp.com/api/v1/todos/' + editItemId, newListItem)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to edit.')
      }
      return response.json()
    })
    .then(editedListItem => {
      console.log(editedListItem)
      getTodoList()
      setEditOpen(false)
      setEditItemValue('')
      setEditItemId('')
    })
  }

  const updateListOnSort = event => {
    for (var i = 0; i < todoList.length; i++) {
      const reorderListItem = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ position: i})
      }
      fetch('https://toasty-todo.herokuapp.com/api/v1/todos/' + todoList[i].id, reorderListItem)
    }
    setSearchValue(' ')
    setIsSearching(true)
    setFilteredList(todoList.filter(val => val.title.match(searchValue)))
    setIsSearching(false)
    setSearchValue('')
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
        fetch('https://toasty-todo.herokuapp.com/api/v1/todos', newListItem)
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
    fetch('https://toasty-todo.herokuapp.com/api/v1/todos')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch.')
      }
      return response.json()
    })
    .then(todoListItems => {
      setTodoList(todoListItems.data)
      setFilteredList(todoListItems.data)
    })
  }

  const deleteItem = event => {
    const deleteRequest = {
      method: 'DELETE'
    }
    fetch('https://toasty-todo.herokuapp.com/api/v1/todos/' + event.currentTarget.id, deleteRequest)
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

  const editItemHandler = event => {
    setEditOpen(true)
    setEditItemId(event.currentTarget.id)
  }

  const updateEditValueHandler = event => {
    setEditItemValue(event.target.value)
  }

  let content = (
    <React.Fragment>
      <div className='mainContainer'>

      <div className='leftColumn'>
      <Header 
        searchValue={searchValue}
        setSearchValue={setSearchValueHandler}
        totalTodos={todoList.length}/>
      <NewListForm
        updateFormTitleValue={updateFormTitleHandler}
        submitForm={submitFormHandler}
        editOpen={editOpen}
        submitEditForm={editItemSubmitHandler}
        updateEditValue={updateEditValueHandler}
        todoTitleValue={todoTitleValue}
        showError={showError}
        />
      </div>
      <div className='rightColumn'>
      <TodoList 
        getTodoList={getTodoList}
        deleteItem={deleteItem}
        completeItem={setComplete}
        editItem={editItemHandler}
        updateListOnSort={updateListOnSort}
        setSortIndex={setSortIndex}
        isSearching={isSearching}
        setTodoList={setTodoList}
        todoList={filteredList}/>
      </div>
      </div>
    </React.Fragment>
  )
  return content
}

export default App;
