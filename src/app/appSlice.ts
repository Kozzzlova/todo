import { createSlice } from "@reduxjs/toolkit";

export type ThemeMode = "dark" | "light";
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
export type Error = null | string;
type InitialState = typeof initialState;

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as Error,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: (create) => ({
    switchTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode;
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status;
    }),
    setError: create.reducer<{ error: Error }>((state, action) => {
      state.error = action.payload.error;
    }),
  }),
  selectors: {
    selectTheme: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export const { switchTheme, setAppStatus, setError } = appSlice.actions;
export const appReducer = appSlice.reducer;
export const { selectTheme, selectStatus, selectError } = appSlice.selectors;

// export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
//   switch (action.type) {
//     case "SWITCH_THEME": {
//       return { ...state, themeMode: action.payload.theme };
//     }

//     case "SET_STATUS": {
//       return { ...state, status: action.payload.status };
//     }
//     case "SET_ERROR": {
//       return { ...state, error: action.payload.error };
//     }
//     default:
//       return state;
//   }
// };

// // Action creators
// export const switchThemeAC = (theme: ThemeMode) => {
//   return {
//     type: "SWITCH_THEME",
//     payload: { theme },
//   } as const;
// };

// export const setAppStatusAC = (status: RequestStatus) => {
//   return {
//     type: "SET_STATUS",
//     payload: { status },
//   } as const;
// };

// export const setErrorAC = (error: Error) => {
//   return {
//     type: "SET_ERROR",
//     payload: {
//       error,
//     },
//   } as const;
// };

// // Actions types
// export type SwitchThemeActionType = ReturnType<typeof switchThemeAC>;
// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
// export type SetErrorActionType = ReturnType<typeof setErrorAC>;

// type ActionsType = SwitchThemeActionType | SetAppStatusActionType | SetErrorActionType;
