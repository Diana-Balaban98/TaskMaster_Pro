import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./TodoList";
import {v1} from "uuid"


export type FilterValuesType = "all" | "completed" | "active"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskAssocType = {
    [key: string]: TaskType[]
}

const App = () => {

    // const [tasks, setTasks] = useState<Array<TaskType>>( [
    //     {id: v1(), title: "CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "React", isDone: false},
    //     {id: v1(), title: "Node.js", isDone: true},
    //     {id: v1(), title: "React Native", isDone: false},
    //     {id: v1(), title: "Redux", isDone: false},
    // ])

    const addTasks = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        // setTasks([newTask, ...tasks])
    }

    function removeTask(todolistId: string, taskId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
        // let filteredTasks = tasks.filter(t => t.id !== id)
        // setTasks(filteredTasks);
    }

    // let [filter, setFilter] = useState<FilterValuesType>("all")

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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


    const changeStatus = (todolistId: string, taskId: string, checkedValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: checkedValue} : el)
        })
        // setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: checkedValue} : el))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
        // setFilter(value)
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }


    return (
        <div className="App">
            {todolists.map(el => {
                let taskForTodolist = tasks[el.id];

                if (el.filter === "completed") {
                    taskForTodolist = tasks[el.id].filter(t => t.isDone === true)
                }

                if (el.filter === "active") {
                    taskForTodolist = tasks[el.id].filter(t => t.isDone === false)
                }

                return <Todolist
                    key={el.id}
                    todolistId={el.id}
                    title={el.title}
                    tasks={taskForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTasks={addTasks}
                    changeStatus={changeStatus}
                    filter={el.filter}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;
