import React from "react";


type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>, // TaskType[] - еще такой синтаксис
    removeTask: (taskId: number) => void
    changeFilter: (filer: FilterValuesType) => void
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = ({
                                                   title,
                                                   tasks,
                                                   removeTask,
                                                   changeFilter
                                               }) => {
    const tasksJSX: Array<JSX.Element> = tasks.map((task) => {
        return <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={() => removeTask(task.id)}></button>
        </li>
    })

    return (
        <div>
            <div className='todolist'>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <button onClick={() => changeFilter("all")}>All</button>
                    <button onClick={() => changeFilter("active")}>Active</button>
                    <button onClick={() = changeFilter("completed")}>Completed</button>
                </div>
            </div>
        </div>
    )
}

export default TodoList;