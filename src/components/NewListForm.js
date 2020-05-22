import React, {useState, useEffect } from 'react'

const NewListForm = props =>  {
    const [todoTitle, setTodoTitle] = useState('')
    const [todoDescription, setTodoDescription] = useState('')

    const onFormSubmit = event => {
        event.preventDefault()
        if (todoTitle === '') {
            console.log('error')
        }
        else {
            const newListItem = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ title: todoTitle, description: todoDescription})
            }
            fetch('https://toasty-todo.herokuapp.com/api/v1/todos', newListItem)
                .then(response => console.log(response))
        }
        
    }

    let content = (

    props.showForm === true ?
     <div>
        <form onSubmit={onFormSubmit}>
            <label>
                To Do
            </label>
            <br/>
            <input 
            type='text' 
            id='todoTitle' 
            placeholder='Your next To Do'
            value={todoTitle}
            onChange={e => setTodoTitle(e.target.value)}
            />
            <br/>
            <label>
                Description
            </label>
            <br/>
            <input 
            type='text' 
            id='todoDescription' 
            placeholder='Your next To Do'
            value={todoDescription}
            onChange={e => setTodoDescription(e.target.value)}
            />
            <br/>
            <input type="submit"/>
        </form>
    </div>
    : <div>
            <button
            onClick={props.onSetShowForm}
            >
                show form
            </button>
        </div>
    )
    return content
}

export default NewListForm