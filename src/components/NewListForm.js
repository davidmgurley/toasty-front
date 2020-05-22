import React, { useState, useEffect } from 'react'

const NewListForm = props =>  {
    const onFormSubmit = event => {
        event.preventDefault()
        props.submitForm()
    }

    let content = (
     <div>
        <form onSubmit={onFormSubmit}>
            <label>
                Add To Your List (Marshmallows? Chocolate?)
            </label>
            <br/>
            <input 
            type='text' 
            id='todoTitle' 
            placeholder='Your next To Do'
            value={props.todoTitleValue}
            onChange={props.updateFormTitleValue}
            />
            <input type="submit"/>
        </form>
    </div>
    )
    return content
}

export default NewListForm