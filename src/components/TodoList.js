import React, {useState, useEffect } from 'react'
import { ReactSortable } from "react-sortablejs"
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'

const TodoList = props => {

    useEffect(() => {
        props.getTodoList()
    }, [])

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          maxWidth: 360,
          backgroundColor: theme.palette.background.paper,
        },
      }))

    const listDragUpdate = event => {
        console.log('this thing ran')
        console.log(event.oldIndex)
    }

    const classes = useStyles()

    let content = (
        <ReactSortable 
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
                    <Button id={item.id} onClick={props.deleteItem}>Delete</Button>
                </ListItem>
            </List>
             ))}
        </ReactSortable>
    )
    return content
}

export default TodoList