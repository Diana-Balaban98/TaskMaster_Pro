import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./TodoList";
import {v1} from "uuid"


export type FilterValuesType = "all" | "completed" | "active"

const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>( [
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Node.js", isDone: true},
        {id: v1(), title: "React Native", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])


    const addTasks = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeStatus = (taskId: string, checkedValue: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: checkedValue} : el))
    }


    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
            setFilter(value)
    }

    let taskForTodolist = tasks;

    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.isDone  === true)
    }

    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.isDone  === false)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTasks={addTasks}
                changeStatus={changeStatus}
            />
        </div>
    );
}


export default App;
