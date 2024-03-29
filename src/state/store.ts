import {TasksActionsType, tasksReducer} from './tasks/tasks-reducer';
import {TodolistsActionTypes, todolistsReducer} from './todolists/todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "../app/appReducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// общий тип для всех actions в приложении
export type ActionsApp = TodolistsActionTypes | TasksActionsType

export type AppDispatchType = ThunkDispatch<AppRootStateType, void, ActionsApp>

export const useAppDispatch = () => useDispatch<AppDispatchType>()

export type AppThunk = ThunkAction<void, AppRootStateType, unknown, AnyAction>


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;