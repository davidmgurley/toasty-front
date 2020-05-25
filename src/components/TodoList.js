import React, {useState, useEffect } from 'react'
import { ReactSortable } from "react-sortablejs"
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button';

const TodoList = props => {

    useEffect(() => {
        props.getTodoList()
    }, [])

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          maxWidth: 360,
        },
      }))

    const listDragUpdate = event => {
        console.log('this thing ran')
        console.log(event.oldIndex)
    }

    const classes = useStyles()

    let content = (
        <div>
            {props.isSearching ?
            <div>
                 {props.todoList.map(item => (
                    <List className={classes.root}>
                        <ListItem key={item.id}>
                            <ListItemText>{item.title}</ListItemText>
                            <Button id={item.id} onClick={props.deleteItem}>X</Button>
                        </ListItem>
                    </List>
                     ))}
            </div>
            : <ReactSortable 
            list={props.todoList} 
            setList={props.setTodoList}
            animation={200}
            delayOnTouchStart={true}
            delay={2}
            onUpdate= {listDragUpdate}>
                 {props.todoList.map(item => (
                <List className={classes.root}>
                    <ListItem key={item.id}>
                        <ListItemText>{item.title}</ListItemText>
                        <Button id={item.id} onClick={props.deleteItem}>X</Button>
                    </ListItem>
                </List>
                 ))}
            </ReactSortable>}
        </div>

    )
    return content
}

export default TodoList