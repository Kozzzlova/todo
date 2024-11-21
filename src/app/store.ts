import { Action, AnyAction, UnknownAction } from "redux";
import { tasksReducer, tasksSlice } from "features/todolists/model/tasksSlice";
import { todolistsReducer, todolistsSlice } from "features/todolists/model/todolistsSlice";
import { appReducer, appSlice } from "./appSlice";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { authReducer, authSlice } from "features/auth/model/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
});

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
// const rootReducer = combineReducers({
//   tasks: tasksReducer,
//   todolists: todolistsReducer,
//   app: appReducer,
//   auth: authReducer,
// });
// непосредственно создаём store
//export const store = createStore(rootReducer, {}, applyMiddleware(thunk));
//export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;
//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>;
