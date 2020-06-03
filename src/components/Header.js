import React, {useState, useEffect } from 'react'
import { FilledInput } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Divider } from '@material-ui/core';

const Header = props => {
    let content = (
        <div>
            <h1 className='toastyTitle'>
                Toasty
            </h1>
            <h3 className='countText'>
                You have {props.totalTodos} items on your list
            </h3>
            <Divider className='divider' variant="middle" />
            <FormControl className='search' variant='filled'>
              <InputLabel className='form'>
              Search
              </InputLabel>
              <FilledInput
                onChange={props.setSearchValue}
                className='form'
                htmlFor='component-filled'
                type='text' 
                id='todoSearch' 
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