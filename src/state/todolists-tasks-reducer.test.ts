import {tasksReducer} from "./tasks/tasks-reducer";
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists/todolists-reducer";
import {TaskAssocType} from "../app/AppWithRedux";


test('ids should be equals', () => {
    const startTasksState: TaskAssocType = {};
    const startTodolistsState: TodolistDomainType[] = [];

    const action = addTodolistAC({id: "", order: 1, addedDate: "", title: ""});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});