import React, {useState, useEffect } from 'react'

const List = props => {

    useEffect(() => {
        props.getTodoList()
      }, [])

      console.log(props.listItems)

    let content = (
         <div>
             {props.listItems.map(item => (
                 <div>
                    <h3>{item.title}</h3>
                    <button id={item.id} onClick={props.deleteItem}>Delete</button>
                </div>
             ))}
        </div>
    )
    return content
}

export default List