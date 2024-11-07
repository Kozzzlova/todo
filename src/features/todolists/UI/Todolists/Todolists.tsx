import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper/Paper";
import { Todolist } from "./Todolist/Todolist";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectTodolists } from "features/todolists/model/todolistsSelectors";
import { useAppDispatch } from "common/index";
import { fetchTodolistsTC } from "features/todolists/model/todolists-reducer";

const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, []);
  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid key={tl.id} item sx={{ pt: "30px", mr: "30px" }}>
            <Paper elevation={3} sx={{ p: "15px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        );
      })}
    </>
  );
};

export default Todolists;
