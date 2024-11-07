import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import styles from "./TodolistTitle.module.css";
import { useAppDispatch } from "common";
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "features/todolists/model/todolists-reducer";

type Props = {
  todolist: DomainTodolist;
};

const TodolistTItle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();
  const removeTodolistHandler = () => {
    dispatch(removeTodolistTC(todolist.id));
  };
  const updateTodolistHandler = (title: string) => {
    dispatch(updateTodolistTitleTC({ id: todolist.id, title }));
  };
  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan
          disabled={todolist.entityStatus === "loading"}
          value={todolist.title}
          onChange={updateTodolistHandler}
        />
        <IconButton
          disabled={todolist.entityStatus === "loading"}
          color="secondary"
          aria-label="delete"
          onClick={removeTodolistHandler}
        >
          X
        </IconButton>
      </h3>
    </div>
  );
};

export default TodolistTItle;
