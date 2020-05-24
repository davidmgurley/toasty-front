import React, {useState, useEffect } from 'react'
import InputBase from '@material-ui/core/InputBase'
// import SearchIcon from '@material-ui/icons/Search'

const Header = props => {
    let content = (
        <div>
            <h1>
                Toasty
            </h1>
            {/* <div className={classes.searchIcon}>
              <SearchIcon />
            </div> */}
            <InputBase
              placeholder="Search…"
            //   classes={{
            //     root: classes.inputRoot,
            //     input: classes.inputInput,
            //   }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <h3>
                You have {props.totalTodos} items on your list
            </h3>
        </div>
    )
    return content
}

export default Header