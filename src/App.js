import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import List from './components/List'
import NewListForm from './components/NewListForm'
import './App.css';

const App = props => {

  const [showForm, setShowForm] = useState(false)
  const [todoTitleValue, setTodoTitleValue] = useState('')
  const [todoDescriptionValue, setTodoDescriptionValue] = useState('')
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
            body: JSON.stringify({ title: todoTitleValue, description: todoDescriptionValue})
        }
        fetch('https://cors-anywhere.herokuapp.com/https://toasty-todo.herokuapp.com/api/v1/todos', newListItem)
            .then(response => console.log(response))
    }
  }

  useEffect(() => {
    fetch('https://cors-anywhere.herokuapp.com/https://toasty-todo.herokuapp.com/api/v1/todos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(todoListItems => {
        setTodoList(todoListItems.data)
      })
  }, [])

  let content = (
    <React.Fragment>
      <Header totalTodos='0'/>
      <List listItems={todoList}/>
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
