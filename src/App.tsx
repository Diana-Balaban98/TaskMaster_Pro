import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/TodoList/TodoList";
import {v1} from "uuid"
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";


export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskAssocType = {
    [key: string]: TaskType[]
}

const App = () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    let [tasks, setTasks] = useState<TaskAssocType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    // functions for change tasks
    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
    }

    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(t => {
                return t.id === taskId ? {...t, title: updateTitle} : t
            })
        });
    };

    const changeStatusTask = (todolistId: string, taskId: string, checkedValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: checkedValue} : t)
        });
    };

    // functions for change todolist
    const addTodolist = (newTitle: string) => {
        const newTodo: TodolistType = {id: v1(), title: newTitle, filter: "all"};
        setTodolists([...todolists, newTodo]);
        setTasks({
            ...tasks, [newTodo.id]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Bread", isDone: true},
            ]
        });
    }

    const updateTodolist = (todolistId: string, updateTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: updateTitle} : tl));
    };

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
        delete tasks[todolistId];
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl));
    }

    const todos = todolists.map(el => {
        let taskForTodolist = tasks[el.id];

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

export default App;
