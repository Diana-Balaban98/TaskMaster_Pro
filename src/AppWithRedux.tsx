import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./tests/todolists/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./tests/tasks/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./tests/store";


export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskAssocType = {
    [key: string]: TaskType[]
}

export const AppWithRedux = () => {
    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskAssocType>(state => state.tasks)
    let dispatch = useDispatch()

    // functions for change tasks
    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }

    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        dispatch(changeTaskTitleAC(taskId, updateTitle, todolistId))
    };

    const changeStatusTask = (todolistId: string, taskId: string, checkedValue: boolean) => {
        dispatch(changeTaskStatusAC(taskId, checkedValue, todolistId))
    };

    // functions for change todolist
    const addTodolist = (newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }

    const updateTodolist = (todolistId: string, updateTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, updateTitle))
    };

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, filter))
    }

    const todos = todolists.map(el => {
        console.log(el, tasks)
        let taskForTodolist = tasks[el.id] ?? [];

        if (el.filter === "completed") {
            taskForTodolist = tasks[el.id].filter(t => t.isDone);
        }

        if (el.filter === "active") {
            taskForTodolist = tasks[el.id].filter(t => !t.isDone);
        }

        return <Grid item>
            <Paper elevation={5} style={{margin: '10px'}}>
                <Todolist
                    key={el.id}
                    todolistId={el.id}
                    title={el.title}
                    tasks={taskForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTasks={addTask}
                    changeStatus={changeStatusTask}
                    filter={el.filter}
                    removeTodolist={removeTodolist}
                    updateTask={updateTask}
                    updateTodolist={updateTodolist}
                />
            </Paper>
        </Grid>
    })

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{marginTop: '10px'}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container>
                    {todos}
                </Grid>
            </Container>
        </div>
    );
}


