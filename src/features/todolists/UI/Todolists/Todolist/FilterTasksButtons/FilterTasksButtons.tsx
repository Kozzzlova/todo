import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { filterButtonsContainerSx } from "./FilterTasksButtons.styles";
import { useAppDispatch } from "common";
import { changeTodolistFilter, DomainTodolist, FilterValuesType } from "features/todolists/model/todolistsSlice";

type Props = {
  todolist: DomainTodolist;
};

const FilterTasksButtons = ({ todolist: { id, filter } }: Props) => {
  const dispatch = useAppDispatch();
  const changeFilterTasksHandler = (todoListId: string, filter: FilterValuesType) => {
    dispatch(changeTodolistFilter({ id: todoListId, filter }));
  };
  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        color="secondary"
        variant={filter === "all" ? "contained" : "outlined"}
        title={"All"}
        onClick={() => changeFilterTasksHandler(id, "all")}
      >
        ALL
      </Button>
      <Button
        color="error"
        variant={filter === "active" ? "contained" : "outlined"}
        title={"Active"}
        onClick={() => changeFilterTasksHandler(id, "active")}
      >
        ACTIVE
      </Button>
      <Button
        color="success"
        variant={filter === "completed" ? "contained" : "outlined"}
        title={"Completed"}
        onClick={() => changeFilterTasksHandler(id, "completed")}
      >
        COMPLETED
      </Button>
    </Box>
  );
};

export default FilterTasksButtons;
