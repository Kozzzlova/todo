import { AddItemForm } from "common/components";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "common";
import Todolists from "features/todolists/UI/Todolists/Todolists";
import { addTodolistTC } from "features/todolists/model/todolistsSlice";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "features/auth/model/authSelector";
import { Path } from "common/router";

export const Main = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const addTodolist = (title: string) => {
    dispatch(addTodolistTC(title));
  };
  // if (!isLoggedIn) {
  //   return <Navigate to={Path.Login} />;
  // }

  return (
    <Container sx={{ flexGrow: 1, flex: "auto" }}>
      <Grid container>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container>
        <Todolists />
      </Grid>
    </Container>
  );
};
