import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "../components/TodoList/TodoList";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {ButtonAppBar} from "../components/ButtonAppBar/ButtonAppBar";
import {
    addTodolistTC,
    changeFilterAC,
    changeTitleTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType,
} from "../state/todolists/todolists-reducer";
import {addTaskTC, changeStatusTaskTC, removeTaskTC, updateTitleTaskTC,} from "../state/tasks/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";
import {TaskStatuses, TaskType} from "../api/tasks-api";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";

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
        dispatch(updateTitleTaskTC(todolistId, taskId, updateTitle))
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

    const todos = todolists.map(todo => {
        return <Grid key={todo.id} item>
            <Paper elevation={5} style={{margin: '10px'}}>
                <Todolist
                    todolistId={todo.id}
                    title={todo.title}
                    tasks={tasks[todo.id]}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTasks={addTask}
                    changeStatus={changeStatusTask}
                    filter={todo.filter}
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
            <LinearProgress/>
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


