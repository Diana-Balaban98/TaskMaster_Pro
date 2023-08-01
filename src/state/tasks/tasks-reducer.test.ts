import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TaskAssocType} from "../../AppWithRedux";
import {addTodolistAC, removeTodolistAC} from "../todolists/todolists-reducer";

let startState: TaskAssocType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: 0, todoListId: "", priority: 1, startDate: "", order: 1, addedDate: "", description: "", deadline: ""},
            {id: "2", title: "JS", status: 0, todoListId: "", priority: 1, startDate: "", order: 1, addedDate: "", description: "", deadline: ""},
            {id: "3", title: "React", status: 0, todoListId: "", priority: 1, startDate: "", order: 1, addedDate: "", description: "", deadline: ""}
        ],
        "todolistId2": [
            {id: "1", title: "bread",status: 0, todoListId: "", priority: 1, startDate: "", order: 1, addedDate: "", description: "", deadline: ""},
            {id: "2", title: "milk", status: 0, todoListId: "", priority: 1, startDate: "", order: 1, addedDate: "", description: "", deadline: ""},
            {id: "3", title: "tea", status: 0, todoListId: "", priority: 1, startDate: "", order: 1, addedDate: "", description: "", deadline: ""}
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });
});

test('correct task should be added to correct array', () => {
    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(0);
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(1);
    expect(endState["todolistId2"][1].status).toBe(0);
});

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC("2", 'React', "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe('JS');
    expect(endState["todolistId2"][1].title).toBe('React');
});

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});