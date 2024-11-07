import { applyMiddleware, combineReducers, legacy_createStore as createStore, UnknownAction } from "redux";
import { tasksReducer } from "features/todolists/model/tasks-reducer";
import { TodolistsActionsType, todolistsReducer } from "features/todolists/model/todolists-reducer";
import { appReducer } from "./app-reducer";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";
import { TasksActionsType } from "features/todolists/model/tasks-reducer";
import { authReducer } from "features/auth/model/auth-Reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});
// непосредственно создаём store
export const store = createStore(rootReducer, {}, applyMiddleware(thunk));

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;
export type AppActionType = TodolistsActionsType | TasksActionsType;
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionType>;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
