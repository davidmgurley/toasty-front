import React, { useState, useEffect } from 'react'

const NewListForm = props =>  {
    const onFormSubmit = event => {
        event.preventDefault()
        props.submitForm()
    }

    let content = (

    props.showForm === true ?
     <div>
        <form onSubmit={onFormSubmit}>
            <label>
                Tos Do
            </label>
            <br/>
            <input 
            type='text' 
            id='todoTitle' 
            placeholder='Your next To Do'
            value={props.todoTitleValue}
            onChange={props.updateFormTitleValue}
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
            value={props.todoDescriptionValue}
            onChange={props.updateFormDescriptionValue}
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