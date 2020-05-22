import React, {useState, useEffect } from 'react'

const Header = props => {
    let content = (
        <div>
            <h1>
                Toasty
            </h1>
            <h3>
                You have {props.totalTodos} items on your list
            </h3>
        </div>
    )
    return content
}

export default Header