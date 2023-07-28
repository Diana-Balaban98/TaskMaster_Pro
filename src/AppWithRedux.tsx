import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodosAC,
} from "./state/todolists/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {todolistsApi} from "./api/todolists-api";


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

    useEffect(() => {
        todolistsApi.getTodo()
            .then(res => {
                dispatch(setTodosAC(res.data))
            })
    }, [])

    // functions for change tasks
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [])

    const updateTask = useCallback((todolistId: string, taskId: string, updateTitle: string) => {
        dispatch(changeTaskTitleAC(taskId, updateTitle, todolistId))
    }, []);

    const changeStatusTask = useCallback((todolistId: string, taskId: string, checkedValue: boolean) => {
        dispatch(changeTaskStatusAC(taskId, checkedValue, todolistId))
    }, []);

    // functions for change todolist
    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [])

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
        return <Grid item>
            <Paper elevation={5} style={{margin: '10px'}}>
                <Todolist
                    key={el.id}
                    todolistId={el.id}
                    title={el.title}
                    tasks={tasks[el.id]}
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


