import { Todolist } from "../api/todolistsApi.types";
import { todolistsApi } from "../api/todolistsApi";
import { AppDispatch, AppThunk } from "app/store";
import { RequestStatus, setAppStatusAC, setErrorAC } from "app/app-reducer";
import { ResultCode } from "../lib/enums";
import { handleNetworkError, handleServerError } from "common/utils";

export type FilterValuesType = "all" | "active" | "completed";

export type DomainTodolist = Todolist & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};

const initialState: DomainTodolist[] = [];

export const todolistsReducer = (
  state: DomainTodolist[] = initialState,
  action: TodolistsActionsType,
): DomainTodolist[] => {
  switch (action.type) {
    case "SET_TODOLISTS": {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
    }
    case "REMOVE-TODOLIST": {
      return state.filter((el) => el.id !== action.payload.id);
    }
    case "ADD-TODOLIST": {
      const newTodolist: DomainTodolist = {
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      };
      return [newTodolist, ...state];
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((el) => (el.id === action.payload.id ? { ...el, title: action.payload.title } : el));
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todolistId = action.payload.id;
      return state.map((el) => (el.id === todolistId ? { ...el, filter: action.payload.filter } : el));
    }
    case "CHANGE_TODOLIST_ENTITY_STATUS": {
      const todolistId = action.payload.id;
      return state.map((el) => (el.id === todolistId ? { ...el, entityStatus: action.payload.entityStatus } : el));
    }

    default:
      return state;
  }
};

//Action creators

export const setTodolistsAC = (todolists: Todolist[]) => {
  return {
    type: "SET_TODOLISTS",
    payload: {
      todolists,
    },
  } as const;
};

export const removeTodolistAC = (payload: { id: string }) => {
  return {
    type: "REMOVE-TODOLIST",
    payload,
  } as const;
};
export const addTodolistAC = (payload: { todolist: Todolist }) => {
  return {
    type: "ADD-TODOLIST",
    payload,
  } as const;
};
export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload,
  } as const;
};
export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload,
  } as const;
};

export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
  return {
    type: "CHANGE_TODOLIST_ENTITY_STATUS",
    payload,
  } as const;
};

//Thunk creators

export const fetchTodolistsTC = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatusAC("succeeded"));
      dispatch(setTodolistsAC(res.data));
    })
    .catch((err) => {
      handleNetworkError(dispatch, err);
    });
};

export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));
    todolistsApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Succes) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(addTodolistAC({ todolist: res.data.data.item }));
        } else {
          handleServerError(dispatch, res.data);
        }
      })
      .catch((err) => {
        handleNetworkError(dispatch, err);
      });
  };
export const updateTodolistTitleTC =
  (arg: { id: string; title: string }): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));
    todolistsApi
      .updateTodolist(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Succes) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(changeTodolistTitleAC(arg));
        } else {
          handleServerError(dispatch, res.data);
        }
      })
      .catch((err) => {
        handleNetworkError(dispatch, err);
      });
  };

export const removeTodolistTC =
  (id: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }));
    todolistsApi
      .removeTodolist(id)
      .then((res) => {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(removeTodolistAC({ id }));
      })
      .catch((err) => {
        dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "idle" }));
        handleNetworkError(dispatch, err);
      });
  };
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistEntityStatusctionType = ReturnType<typeof changeTodolistEntityStatusAC>;

export type TodolistsActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusctionType;
