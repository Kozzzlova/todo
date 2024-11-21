import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { MenuButton } from "common/components";
import Switch from "@mui/material/Switch";
import { getTheme } from "common";
import { switchTheme } from "app/appSlice";
import { useAppDispatch } from "common";
import { useAppSelector } from "common";
import { selectStatus, selectTheme } from "app/appSlice";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { selectIsLoggedIn } from "features/auth/model/authSelector";
import { logoutTC } from "features/auth/model/authSlice";

export const Header = () => {
  const themeMode = useAppSelector(selectTheme);
  const theme = getTheme(themeMode);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const appStatus = useAppSelector(selectStatus);

  const changeModeHandler = () => {
    dispatch(switchTheme({ themeMode: themeMode === "light" ? "dark" : "light" }));
  };
  const logoutHandler = () => {
    dispatch(logoutTC());
  };
  return (
    <Box sx={{ flexGrow: 0, paddingBottom: "100px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>

          {isLoggedIn && (
            <MenuButton onClick={logoutHandler} color="inherit">
              Logout
            </MenuButton>
          )}

          <MenuButton color="inherit">FAQ</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </Toolbar>
        {appStatus === "loading" && <LinearProgress />}
      </AppBar>
    </Box>
  );
};
