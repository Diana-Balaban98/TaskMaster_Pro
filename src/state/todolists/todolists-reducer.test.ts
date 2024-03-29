import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC, setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';


let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

   startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 1, addedDate: ""},
        {id: todolistId2, title: "What to buy", filter: "all", order: 2, addedDate: ""}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const newTodolist =  {id: todolistId1, title: "New object for todolist", filter: "all", order: 1, addedDate: ""};

    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New object for todolist");
    expect(endState[2].filter).toBe("all")
    expect(endState[0]).toBeDefined()
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     id: todolistId2,
    //     title: newTodolistTitle
    // };

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todolistsReducer(startState, changeFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {
    const action = setTodolistsAC(startState)

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});