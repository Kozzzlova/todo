import { AppDispatch } from "app/store";
import { LoginArgs } from "../api/authApi.types";
import { setAppStatus } from "app/appSlice";
import { authApi } from "../api/authApi";
import { ResultCode } from "features/todolists/lib/enums";
import { handleNetworkError, handleServerError } from "common/utils";
import { clearTodo } from "features/todolists/model/todolistsSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = typeof initialState;

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized;
    }),
  }),
});
export const { setIsLoggedIn, setIsInitialized } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Succes) {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
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
  dispatch(setAppStatus({ status: "loading" }));
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Succes) {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(setIsLoggedIn({ isLoggedIn: false }));
        dispatch(clearTodo());
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
  dispatch(setAppStatus({ status: "loading" }));
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Succes) {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      } else {
        handleServerError(dispatch, res.data);
      }
    })
    .catch((err) => {
      handleNetworkError(dispatch, err);
    })
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }));
    });
};

///////////////////////////////////////////////
// export const _authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//   switch (action.type) {
//     // case "SET_IS_LOGGED_IN": {
//     //   return { ...state, isLoggedIn: action.payload.isLoggedIn };
//     // }
//     case "SET_IS_INITIALIZED": {
//       return { ...state, isInitialized: action.payload.isInitialized };
//     }

//     default:
//       return state;
//   }
// };

// export const setIsLoggedInAC = (isLoggedIn: boolean) => {
//   return {
//     type: "SET_IS_LOGGED_IN",
//     payload: { isLoggedIn },
//   } as const;
// };
// export const setIsInitializedAC = (isInitialized: boolean) => {
//   return {
//     type: "SET_IS_INITIALIZED",
//     payload: { isInitialized },
//   } as const;
// };

//type ActionsType =  ReturnType<typeof setIsInitializedAC>;
