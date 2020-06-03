import React, { useState, useEffect } from 'react'
import { FormControl } from '@material-ui/core';
import { FilledInput } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';



const NewListForm = props =>  {
    const onFormSubmit = event => {
        event.preventDefault()
        props.submitForm()
    }

    const onEditFormSubmit = event => {
        event.preventDefault()
        props.submitEditForm()
    }

    let content = (
     <div>
        <form onSubmit={onFormSubmit}>
            <div className='formContainer'>
                <FormControl variant='filled'>
                    <InputLabel className='form'>
                        Add To Your List
                    </InputLabel>
                    <FilledInput
                    className='form'
                    htmlFor='component-filled'
                    type='text' 
                    id='todoTitle' 
                    placeholder='Your next To Do'
                    value={props.todoTitleValue}
                    onChange={props.updateFormTitleValue}
                    />
                </FormControl>
                <FormControl variant='filled'>
                    <FilledInput id='addToListButton' className='form' htmlFor='component-filled' type='submit'/>
                </FormControl>
            </div>
        </form>
        <br/>
        {props.showError === true ?
        <h3>Cannot add blank To Do item</h3>
        :  ''}
        <div>
            {props.editOpen ? 
            <form onSubmit={onEditFormSubmit}>
                <div className='formContainer'>
                    <FormControl variant='filled'>
                    <InputLabel className='form'>
                        Edit Your To Do Item
                    </InputLabel>
                    <FilledInput
                    className='form'
                    htmlFor='component-filled'
                    type='text' 
                    id='editField' 
                    value={props.editValue}
                    onChange={props.updateEditValue}
                    />
                    </FormControl>
                    <FormControl variant='filled'>
                        <FilledInput className='form' htmlFor='component-filled' type='submit'/>
                    </FormControl>
                </div>
            </form>
        : ''}
        </div>
    </div>
    )
    return content
}

export default NewListForm