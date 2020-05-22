import React, {useState, useEffect } from 'react'

const NewListForm = props =>  {

    let content = (

    props.showForm === true ?
     <div>
        <h3>Show Form

        </h3>
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