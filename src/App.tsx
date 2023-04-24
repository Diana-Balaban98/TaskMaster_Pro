import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


function App() {
    // BLL: бизнес-логика - концепция подъема состояния (пропсы от родительского к дочернему) - данные передаются через пропсы сверху вниз
    const tasks: TaskType[] = [ // переменная tasks должна быть такого типа
        {id: 1, title: "HTML/CSS", isDone: true},
        {id: 2, title: "JS/ES6/TS", isDone: true},
        {id: 3, title: "REACT", isDone: false}
    ]
    
    return (
        <div className="App">
            <TodoList 
                title={"What to learn"} tasks={tasks}/>
        </div>
    );
}

export default App;
