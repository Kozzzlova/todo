import { ThemeProvider } from "@mui/material/styles";
import { CircularProgress, CssBaseline } from "@mui/material";
import { ErrorSnackbar, Header } from "common/components";
import { useAppDispatch, useAppSelector } from "common";
import { getTheme } from "common";
import { selectTheme } from "./appSelectors";
import s from "./app.module.css";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { initializeAppTC } from "features/auth/model/auth-Reducer";
import { selectIsInitialized } from "features/auth/model/authSelector";

export const App = () => {
  const themeMode = useAppSelector(selectTheme);
  const theme = getTheme(themeMode);
  const isInitialized = useAppSelector(selectIsInitialized);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);
  return (
    <div className={s.app}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isInitialized && (
          <>
            <Header />
            <Outlet />
          </>
        )}
        {!isInitialized && (
          <div className={s.circularProgressContainer}>
            <CircularProgress size={150} thickness={3} />
          </div>
        )}
      </ThemeProvider>
    </div>
  );
};
