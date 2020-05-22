import React, { useState } from 'react';
import Header from './components/Header'
import List from './components/List'
import NewListForm from './components/NewListForm'
import './App.css';

const App = props => {

  const [showForm, setShowForm] = useState(false)

  const setShowFormHandler = () => {
    showForm ? setShowForm(false) : setShowForm(true)
  }

  let content = (
    <React.Fragment>
      <Header totalTodos='0'/>
      <List listItems={[]}/>
      <NewListForm
        onSetShowForm={setShowFormHandler}
        showForm={showForm}
        />
    </React.Fragment>
  )

  return content
}

export default App;
