import React from 'react';
import Header from './components/Header'
import List from './components/List'
import NewListForm from './components/NewListForm'
import './App.css';

function App() {
  return (
    <div className="container">
      <Header totalTodos='0'/>
      <List listItems=''/>
      <NewListForm/>
    </div>
  );
}

export default App;
