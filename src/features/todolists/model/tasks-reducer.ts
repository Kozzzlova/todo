import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";
import { Dispatch } from "redux";
import { tasksApi } from "../api/taskApi";
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types";
import { ResultCode, TaskPriority, TaskStatus } from "../lib/enums/enums";
import { AppDispatch, AppThunk, RootState } from "app/store";
import { RequestStatus, setAppStatusAC, setErrorAC } from "app/app-reducer";
import { handleNetworkError, handleServerError } from "common/utils";
export type UpdateTaskDomainModel = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<DomainTask & { entityStatus: RequestStatus }>;
};

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
  switch (action.type) {
    case "SET_TASKS": {
      const stateCopy = { ...state };
      stateCopy[action.payload.todolistId] = action.payload.tasks.map((task) => ({
        ...task,
        entityStatus: "idle",
      }));
      return stateCopy;
    }
    case "REMOVE_TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (task) => task.id !== action.payload.taskId,
        ),
      };
    }
    case "ADD_TASK": {
      const newTask = {
        ...action.payload.task,
        entityStatus: "idle" as RequestStatus,
      };

      return {
        ...state,
        [newTask.todoListId]: [newTask, ...state[newTask.todoListId]],
      };
    }
    case "UPDATE_TASK": {
      const newTask = action.payload.model;
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, ...newTask } : t,
        ),
      };
    }
    case "CHANGE_TASK_ENTITY_STATUS": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, entityStatus: action.payload.entityStatus } : t,
        ),
      };
    }

    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.payload.todolist.id]: [],
      };
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    }

    default:
      return state;
  }
};

// Action creators
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET_TASKS",
    payload,
  } as const;
};
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return { type: "REMOVE_TASK", payload: payload } as const;
};

export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD_TASK", payload } as const;
};

export const updateTaskAC = (payload: { taskId: string; todolistId: string; model: UpdateTaskDomainModel }) => {
  return {
    type: "UPDATE_TASK",
    payload,
  } as const;
};

export const changeTaskEntityStatusAC = (payload: {
  taskId: string;
  todolistId: string;
  entityStatus: RequestStatus;
}) => {
  return {
    type: "CHANGE_TASK_ENTITY_STATUS",
    payload,
  } as const;
};

//Thunk creators
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));
    tasksApi
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(setTasksAC({ todolistId, tasks: res.data.items }));
      })
      .catch((err) => {
        handleNetworkError(dispatch, err);
      });
  };

export const removeTaskTC =
  (arg: { todolistId: string; taskId: string }): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTaskEntityStatusAC({ ...arg, entityStatus: "loading" }));
    tasksApi
      .removeTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Succes) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(removeTaskAC(arg));
        } else {
          handleServerError(dispatch, res.data);
        }
      })
      .catch((err) => {
        dispatch(changeTaskEntityStatusAC({ ...arg, entityStatus: "idle" }));
        handleNetworkError(dispatch, err);
      });
  };

export const addTaskTC =
  (arg: { todolistId: string; title: string }): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    tasksApi
      .createTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Succes) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(addTaskAC({ task: res.data.data.item }));
        } else {
          handleServerError(dispatch, res.data);
        }
      })
      .catch((err) => {
        handleNetworkError(dispatch, err);
      });
  };

export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }): AppThunk =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskId, todolistId, domainModel } = arg;
    const task = getState().tasks[todolistId].find((t) => t.id === taskId);
    if (task) {
      const apiModel: UpdateTaskModel = {
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel,
      };
      dispatch(setAppStatusAC("loading"));
      tasksApi
        .updateTask({ todolistId, taskId, model: apiModel })
        .then((res) => {
          if (res.data.resultCode === ResultCode.Succes) {
            dispatch(setAppStatusAC("succeeded"));
            dispatch(updateTaskAC({ taskId, todolistId, model: domainModel }));
          } else {
            handleServerError(dispatch, res.data);
          }
        })
        .catch((err) => {
          handleNetworkError(dispatch, err);
        });
    }
  };

// Actions types

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;
export type ChangeTaskEntityStatusActionType = ReturnType<typeof changeTaskEntityStatusAC>;

export type TasksActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksActionType
  | UpdateTaskActionType
  | ChangeTaskEntityStatusActionType;
