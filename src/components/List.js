import React, {useState, useEffect } from 'react'

const List = props => {
    let content = (
         <div>
             {props.listItems.map(item => (
                 <h3>{item.title}</h3>
             ))}
        </div>
    )
    return content
}

export default List