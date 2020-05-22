import React from 'react';

function Header (props) {
    return (
        <div>
            <h1>
                Toasty
            </h1>
            <h3>
                You have {props.totalTodos} items on your list
            </h3>
        </div>
    )
}

export default Header