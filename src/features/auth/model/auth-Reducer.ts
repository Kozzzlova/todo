import { AppDispatch } from "app/store";
import { LoginArgs } from "../api/authApi.types";
import { setAppStatusAC } from "app/app-reducer";
import { authApi } from "../api/authApi";
import { ResultCode } from "features/todolists/lib/enums";
import { handleNetworkError, handleServerError } from "common/utils";

type InitialStateType = typeof initialState;

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
};

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN": {
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    }
    case "SET_IS_INITIALIZED": {
      return { ...state, isInitialized: action.payload.isInitialized };
    }

    default:
      return state;
  }
};

export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return {
    type: "SET_IS_LOGGED_IN",
    payload: { isLoggedIn },
  } as const;
};
export const setIsInitializedAC = (isInitialized: boolean) => {
  return {
    type: "SET_IS_INITIALIZED",
    payload: { isInitialized },
  } as const;
};

type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>;

export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"));
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Succes) {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(setIsLoggedInAC(true));
        localStorage.setItem("tl-token", res.data.data.token);
      } else {
        handleServerError(dispatch, res.data);
      }
    })
    .catch((err) => {
      handleNetworkError(dispatch, err);
    });
};
export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"));
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Succes) {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(setIsLoggedInAC(false));
        localStorage.removeItem("tl-token");
      } else {
        handleServerError(dispatch, res.data);
      }
    })
    .catch((err) => {
      handleNetworkError(dispatch, err);
    });
};

export const initializeAppTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"));
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Succes) {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(setIsLoggedInAC(true));
      } else {
        handleServerError(dispatch, res.data);
      }
    })
    .catch((err) => {
      handleNetworkError(dispatch, err);
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true));
    });
};
