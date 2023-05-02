import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";




type FilterValuesType = "all" | "active" | "completed"

function App() {
    // BLL: бизнес-логика - концепция подъема состояния (пропсы от родительского к дочернему) - данные передаются через пропсы сверху вниз
    const title: string = "What to learn"


    const [tasks, setTasks] = React.useState<TaskType[]>(
        [
            {id: 1, title: "HTML/CSS", isDone: true},
            {id: 2, title: "JS/ES6/TS", isDone: true},
            {id: 3, title: "REACT", isDone: false},
            {id: 4, title: "TS", isDone: false}
        ]

    ) // переменная tasks должна быть такого типа

    const [filter, setFilter] = useState<FilterValuesType>("active")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter((filter))
    }

    const removeTask = (taskId: number) => {
        const updateTasks = tasks.filter((task: TaskType) => task.id !== taskId)
            setTasks(updateTasks)

    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> =>
    {
        switch (filter) {
            case "active":
                return  tasks.filter(t => !t.isDone)
            case "completed":
                return  tasks.filter(t => t.isDone)
            default: tasks
        }
    }

    export const filtredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    // UI: пользовательский интерфейс
    return (
        <div className="App">
            <TodoList 
                title={title}
                tasks={filtredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
