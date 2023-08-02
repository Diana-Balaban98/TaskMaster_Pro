import React from 'react';

const AppWithReducer = () => {
    return (
        <div>
          AppWithReducer with  useReducer()
        </div>
    );
};

export default AppWithReducer;
// import React, {Reducer, useReducer} from 'react';
// import './App.css';
// import {TaskType, Todolist} from "./components/TodoList/TodoList";
// import {v1} from "uuid"
// import {AddItemForm} from "./components/AddItemForm/AddItemForm";
// import {ButtonAppBar} from "./components/ButtonAppBar/ButtonAppBar";
// import {Container, Grid, Paper} from "@mui/material";
// import {
//     ActionTypes,
//     addTodolistAC,
//     changeFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsReducer,
// } from "./state/todolists/todolists-reducer";
// import {
//     ActionsType,
//     addTaskAC,
//     changeTaskStatusAC,
//     changeTaskTitleAC,
//     removeTaskAC,
//     tasksReducer
// } from "./state/tasks/tasks-reducer";
//
//
// export type FilterValuesType = "all" | "completed" | "active"
//
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type TaskAssocType = {
//     [key: string]: TaskType[]
// }
//
// const AppWithReducer = () => {
//     let todolistID1 = v1();
//     let todolistID2 = v1();
//
//     let [todolists, dispatchToTodolists] = useReducer<Reducer<TodolistType[], ActionTypes>>(todolistsReducer,[
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'},
//     ]);
//
//     let [tasks, dispatchToTasks] = useReducer<Reducer<TaskAssocType, ActionsType>>(tasksReducer,{
//         [todolistID1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//             {id: v1(), title: "Rest API", isDone: false},
//             {id: v1(), title: "GraphQL", isDone: false},
//         ],
//         [todolistID2]: [
//             {id: v1(), title: "HTML&CSS2", isDone: true},
//             {id: v1(), title: "JS2", isDone: true},
//             {id: v1(), title: "ReactJS2", isDone: false},
//             {id: v1(), title: "Rest API2", isDone: false},
//             {id: v1(), title: "GraphQL2", isDone: false},
//         ]
//     });
//
//     // functions for change tasks
//     const addTask = (todolistId: string, title: string) => {
//         dispatchToTasks(addTaskAC(title, todolistId))
//     }
//
//     const removeTask = (todolistId: string, taskId: string) => {
//         dispatchToTasks(removeTaskAC(taskId, todolistId))
//     }
//
//     const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
//         dispatchToTasks(changeTaskTitleAC(taskId, updateTitle, todolistId))
//     };
//
//     const changeStatusTask = (todolistId: string, taskId: string, checkedValue: boolean) => {
//         dispatchToTasks(changeTaskStatusAC(taskId, checkedValue, todolistId))
//     };
//
//     // functions for change todolist
//     const addTodolist = (newTitle: string) => {
//         dispatchToTodolists(addTodolistAC(newTitle))
//         dispatchToTasks(addTodolistAC(newTitle))
//     }
//
//     const updateTodolist = (todolistId: string, updateTitle: string) => {
//         dispatchToTodolists(changeTodolistTitleAC(todolistId, updateTitle))
//     };
//
//     const removeTodolist = (todolistId: string) => {
//         dispatchToTodolists(removeTodolistAC(todolistId))
//     }
//
//     const changeFilter = (todolistId: string, filter: FilterValuesType) => {
//         dispatchToTodolists(changeFilterAC(todolistId, filter))
//     }
//
//     const todos = todolists.map(el => {
//         console.log(el, tasks)
//         let taskForTodolist = tasks[el.id] ?? [];
//
//         if (el.filter === "completed") {
//             taskForTodolist = tasks[el.id].filter(t => t.isDone);
//         }
//
//         if (el.filter === "active") {
//             taskForTodolist = tasks[el.id].filter(t => !t.isDone);
//         }
//
//         return <Grid item>
//             <Paper elevation={5} style={{margin: '10px'}}>
//                     <Todolist
//                         key={el.id}
//                         todolistId={el.id}
//                         title={el.title}
//                         tasks={taskForTodolist}
//                         removeTask={removeTask}
//                         changeFilter={changeFilter}
//                         addTasks={addTask}
//                         changeStatus={changeStatusTask}
//                         filter={el.filter}
//                         removeTodolist={removeTodolist}
//                         updateTask={updateTask}
//                         updateTodolist={updateTodolist}
//                     />
//             </Paper>
//         </Grid>
//     })
//
//     return (
//         <div className="App">
//             <ButtonAppBar/>
//                 <Container fixed>
//                     <Grid container style={{marginTop: '10px'}}>
//                         <AddItemForm callBack={addTodolist}/>
//                     </Grid>
//                     <Grid container>
//                         {todos}
//                     </Grid>
//                 </Container>
//         </div>
//     );
// }
//
// export default AppWithReducer;
