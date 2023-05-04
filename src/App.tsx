import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active"

const App = () => {

    let [tasks, setTasks] = useState<Array<TaskType>>( [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Node.js", isDone: true},
        {id: 5, title: "React Native", isDone: false},
        {id: 6, title: "Redux", isDone: false},

    ])

    type FilterValuesType = "all" | "completed" | "active"
    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: number) {
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
            />
        </div>
    );
}


export default App;
