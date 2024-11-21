import { Todolist } from "../api/todolistsApi.types";
import { todolistsApi } from "../api/todolistsApi";
import { AppDispatch } from "app/store";
import { RequestStatus, setAppStatus, setError } from "app/appSlice";
import { ResultCode } from "../lib/enums";
import { handleNetworkError, handleServerError } from "common/utils";
import { fetchTasksTC } from "./tasksSlice";
import { createSlice } from "@reduxjs/toolkit";

export type FilterValuesType = "all" | "active" | "completed";

export type DomainTodolist = Todolist & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};

const initialState: DomainTodolist[] = [];

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: (create) => ({
    removeTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }),

    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
    }),

    changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    }),
    changeTodolistFilter: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index !== -1) {
        state[index].filter = action.payload.filter;
      }
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index !== -1) {
        state[index].entityStatus = action.payload.entityStatus;
      }
    }),
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
      // action.payload.todolists.forEach((tl) => {
      //   state.push({ ...tl, filter: "all", entityStatus: "idle" });
      // });
    }),
    clearTodo: create.reducer((state, action) => {
      return [];
    }),
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
});

export const {
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
  changeTodolistEntityStatus,
  setTodolists,
  clearTodo,
} = todolistsSlice.actions;
export const todolistsReducer = todolistsSlice.reducer;
export const { selectTodolists } = todolistsSlice.selectors;

//Thunk creators

export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatus({ status: "succeeded" }));
      dispatch(setTodolists({ todolists: res.data }));
      return res.data;
    })
    .then((todos) => {
      console.log(todos);
      todos.forEach((tl) => {
        dispatch(fetchTasksTC(tl.id));
      });
    })
    .catch((err) => {
      handleNetworkError(dispatch, err);
    });
};

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Succes) {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(addTodolist({ todolist: res.data.data.item }));
      } else {
        handleServerError(dispatch, res.data);
      }
    })
    .catch((err) => {
      handleNetworkError(dispatch, err);
    });
};
export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistsApi
    .updateTodolist(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Succes) {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(changeTodolistTitle(arg));
      } else {
        handleServerError(dispatch, res.data);
      }
    })
    .catch((err) => {
      handleNetworkError(dispatch, err);
    });
};

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }));
  todolistsApi
    .removeTodolist(id)
    .then((res) => {
      dispatch(setAppStatus({ status: "succeeded" }));
      dispatch(removeTodolist({ id }));
    })
    .catch((err) => {
      dispatch(changeTodolistEntityStatus({ id, entityStatus: "idle" }));
      handleNetworkError(dispatch, err);
    });
};
// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
// export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
// export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
// export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
// export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
// export type ChangeTodolistEntityStatusctionType = ReturnType<typeof changeTodolistEntityStatusAC>;
// export type ClearTodoType = ReturnType<typeof clearTodoAC>;

// export type TodolistsActionsType =
//   | RemoveTodolistActionType
//   | AddTodolistActionType
//   | ChangeTodolistTitleActionType
//   | ChangeTodolistFilterActionType
//   | SetTodolistsActionType
//   | ChangeTodolistEntityStatusctionType
//   | ClearTodoType;

// export const todolistsReducer = (
//   state: DomainTodolist[] = initialState,
//   action: TodolistsActionsType,
// ): DomainTodolist[] => {
//   switch (action.type) {
//     case "SET_TODOLISTS": {
//       return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
//     }
//     case "REMOVE-TODOLIST": {
//       return state.filter((el) => el.id !== action.payload.id);
//     }
//     case "ADD-TODOLIST": {
//       const newTodolist: DomainTodolist = {
//         ...action.payload.todolist,
//         filter: "all",
//         entityStatus: "idle",
//       };
//       return [newTodolist, ...state];
//     }
//     case "CHANGE-TODOLIST-TITLE": {
//       return state.map((el) => (el.id === action.payload.id ? { ...el, title: action.payload.title } : el));
//     }
//     case "CHANGE-TODOLIST-FILTER": {
//       const todolistId = action.payload.id;
//       return state.map((el) => (el.id === todolistId ? { ...el, filter: action.payload.filter } : el));
//     }
//     case "CHANGE_TODOLIST_ENTITY_STATUS": {
//       const todolistId = action.payload.id;
//       return state.map((el) => (el.id === todolistId ? { ...el, entityStatus: action.payload.entityStatus } : el));
//     }
//     case "CLEAR_TODO": {
//       return [];
//     }

//     default:
//       return state;
//   }
// };

//Action creators

// export const setTodolistsAC = (todolists: Todolist[]) => {
//   return {
//     type: "SET_TODOLISTS",
//     payload: {
//       todolists,
//     },
//   } as const;
// };
// export const removeTodolistAC = (payload: { id: string }) => {
//   return {
//     type: "REMOVE-TODOLIST",
//     payload,
//   } as const;
// };
// export const addTodolistAC = (payload: { todolist: Todolist }) => {
//   return {
//     type: "ADD-TODOLIST",
//     payload,
//   } as const;
// };
// export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
//   return {
//     type: "CHANGE-TODOLIST-TITLE",
//     payload,
//   } as const;
// };
// export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
//   return {
//     type: "CHANGE-TODOLIST-FILTER",
//     payload,
//   } as const;
// };

// export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
//   return {
//     type: "CHANGE_TODOLIST_ENTITY_STATUS",
//     payload,
//   } as const;
// };
// export const clearTodoAC = () => {
//   return {
//     type: "CLEAR_TODO",
//   } as const;
// };
