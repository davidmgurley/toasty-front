import React, {useState, useEffect } from 'react'
import { ReactSortable } from "react-sortablejs"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button';

const TodoList = props => {

    useEffect(() => {
        props.getTodoList()
    }, [])

    let content = (
        <div className='todoList'>
            {props.isSearching ?
            <div>
                <h3>Note: When Searching, drag and drop to reorder is disabled</h3>
                 {props.todoList.map(item => (
                    <List className={item.completed === 'complete' ? 'complete' : 'incomplete'}>
                        <ListItem key={item.id}>
                            <ListItemText>{item.title}</ListItemText>
                            <Button className='completeButton' id={item.id} onClick={props.completeItem}>I DID IT!</Button>
                            <Button className='editButton' id={item.id} onClick={props.editItem}>Edit</Button>
                            <Button className='deleteButton' id={item.id} onClick={props.deleteItem}>X</Button>
                        </ListItem>
                    </List>
                     ))}
            </div>
            : 
            <div>
            <h3>Drag and Drop to reorder your list!</h3>
            <ReactSortable 
            list={props.todoList} 
            setList={props.setTodoList}
            animation={200}
            delayOnTouchStart={true}
            delay={2}
            onEnd= {props.updateListOnSort}
            >
                 {props.todoList.map(item => (
                <List className={item.completed === 'complete' ? 'complete' : 'incomplete'}>
                    <ListItem key={item.id}>
                        <ListItemText>{item.title}</ListItemText>
                        <Button className='completeButton' id={item.id} onClick={props.completeItem}>I DID IT!</Button>
                        <Button className='editButton' id={item.id} onClick={props.editItem}>Edit</Button>
                        <Button className='deleteButton' id={item.id} onClick={props.deleteItem}>X</Button>
                    </ListItem>
                </List>
                 ))}
            </ReactSortable>
            </div>}
        </div>

    )
    return content
}

export default TodoList