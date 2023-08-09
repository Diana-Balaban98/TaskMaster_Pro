import {tasksReducer} from './tasks/tasks-reducer';
import {ActionTypes, todolistsReducer} from './todolists/todolists-reducer';
import {applyMiddleware, combineReducers,  legacy_createStore as createStore} from 'redux';
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>


export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, ActionTypes>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;