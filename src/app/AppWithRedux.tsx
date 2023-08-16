import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "../components/TodoList/TodoList";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {ButtonAppBar} from "../components/ButtonAppBar/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistTC,
    changeFilterAC,
    changeTitleTodolistTC,
    fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType,
} from "../state/todolists/todolists-reducer";
import {addTaskTC, changeStatusTaskTC, removeTaskTC,} from "../state/tasks/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";
import {TaskStatuses, TaskType} from "../api/tasks-api";
import {FilterValuesType} from "../state/todolists/todolists-reducer";

export type TaskAssocType = {
    [key: string]: TaskType[]
}

export const AppWithRedux = () => {
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TaskAssocType>(state => state.tasks)

     const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    // functions for change tasks
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [])

    const updateTask = useCallback((todolistId: string, taskId: string, updateTitle: string) => {
        // dispatch(updateTaskTC(todolistId, taskId, updateTitle))
    }, []);

    const changeStatusTask = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeStatusTaskTC(todolistId, taskId, status))
    }, []);



    // functions for change todolist
    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistTC(newTitle))
    }, [])

    const updateTitleTodolist = (todolistId: string, updateTitle: string) => {
        dispatch(changeTitleTodolistTC(todolistId, updateTitle))
    };

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, filter))
    }

    const todos = todolists.map(el => {
        return <Grid key={el.id} item>
            <Paper elevation={5} style={{margin: '10px'}}>
                <Todolist
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
                    updateTodolist={updateTitleTodolist}
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


