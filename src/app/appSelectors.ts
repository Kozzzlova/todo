import { RootState } from "./store";

export const selectTheme = (state: RootState) => state.app.themeMode;
export const selectStatus = (state: RootState) => state.app.status;
export const selectError = (state: RootState) => state.app.error;
