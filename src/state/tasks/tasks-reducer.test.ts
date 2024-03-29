import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from './tasks-reducer';
import {TaskAssocType} from "../../app/AppWithRedux";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../todolists/todolists-reducer";

let startState: TaskAssocType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: 0,
                todoListId: "",
                priority: 1,
                startDate: "",
                order: 1,
                addedDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "2",
                title: "JS",
                status: 0,
                todoListId: "",
                priority: 1,
                startDate: "",
                order: 1,
                addedDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "3",
                title: "React",
                status: 0,
                todoListId: "",
                priority: 1,
                startDate: "",
                order: 1,
                addedDate: "",
                description: "",
                deadline: ""
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: 0,
                todoListId: "",
                priority: 1,
                startDate: "",
                order: 1,
                addedDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "2",
                title: "milk",
                status: 0,
                todoListId: "",
                priority: 1,
                startDate: "",
                order: 1,
                addedDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "3",
                title: "tea",
                status: 0,
                todoListId: "",
                priority: 1,
                startDate: "",
                order: 1,
                addedDate: "",
                description: "",
                deadline: ""
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: 0,
                todoListId: "",
                priority: 1,
                startDate: "",
                order: 1,
                addedDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "2",
                title: "JS",
                status: 0,
                todoListId: "",
                priority: 1,
                startDate: "",
                order: 1,
                addedDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "3",
                title: "React",
                status: 0,
                todoListId: "",
                priority: 1,
                startDate: "",
                order: 1,
                addedDate: "",
                description: "",
                deadline: ""
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: 0,
                todoListId: "",
                priority: 1,
                startDate: "",
                order: 1,
                addedDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "3",
                title: "tea",
                status: 0,
                todoListId: "",
                priority: 1,
                startDate: "",
                order: 1,
                addedDate: "",
                description: "",
                deadline: ""
            }
        ]
    });
});

test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        id: "4",
        title: "bread",
        status: 0,
        todoListId: "todolistId2",
        priority: 1,
        startDate: "",
        order: 1,
        addedDate: "",
        description: "",
        deadline: ""
    });

    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][3].id).toBe("3")
    expect(endState['todolistId2'][3].title).toBe("tea")
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", 1, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][0].status).toBe(0);
    expect(endState["todolistId2"][1].status).toBe(0);
});

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC("2", 'React', "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe('JS');
    expect(endState["todolistId2"][1].title).toBe('React');
});

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        id: "",
        addedDate: "",
        title: "",
        order: 1
    });

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

test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsAC([
        {id: '1', title: "What to learn", order: 1, addedDate: ""},
        {id: '2', title: "What to buy", order: 2, addedDate: ""}
    ]);

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
});

test('tasks should be added for todolist', () => {
    const action = setTasksAC(startState['todolistId1'], 'todolistId1');

    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': []
    }, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toStrictEqual(0)
});