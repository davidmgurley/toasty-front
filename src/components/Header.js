import React, {useState, useEffect } from 'react'
import { FilledInput } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';


// import SearchIcon from '@material-ui/icons/Search'

const Header = props => {
    let content = (
        <div>
            <h1>
                Toasty
            </h1>
            <h3>
                You have {props.totalTodos} items on your list
            </h3>
            <FormControl className='search' variant='filled'>
              <InputLabel className='form'>
              Search
              </InputLabel>
              <FilledInput
                className='form'
                htmlFor='component-filled'
                type='text' 
                id='todoTitle' 
                placeholder='Search...'
              />
            </FormControl>
            <br/>
            <br/>
        </div>
    )
    return content
}

export default Header