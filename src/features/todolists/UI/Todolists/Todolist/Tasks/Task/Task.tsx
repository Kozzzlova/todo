import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton/IconButton";
import { getListItemSx } from "./Task.styles";
import { Checkbox } from "@mui/material";
import { ChangeEvent } from "react";
import { EditableSpan } from "common/components";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { removeTaskTC, updateTaskTC } from "features/todolists/model/tasksSlice";
import { DomainTodolist } from "features/todolists/model/todolistsSlice";
import { DomainTask } from "features/todolists/api/tasksApi.types";
import { TaskStatus } from "features/todolists/lib/enums/enums";
import { RequestStatus } from "app/appSlice";

type Props = {
  task: DomainTask & { entityStatus: RequestStatus };
  todolist: DomainTodolist;
  disabled?: boolean;
};

const Task = ({ task, todolist, disabled }: Props) => {
  const dispatch = useAppDispatch();
  const removeTask = (taskId: string, todolistId: string) => {
    dispatch(removeTaskTC({ taskId, todolistId }));
  };

  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTC({ todolistId: task.todoListId, taskId: task.id, domainModel: { title } }));
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
    dispatch(updateTaskTC({ todolistId: task.todoListId, taskId: task.id, domainModel: { status } }));
  };

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        {" "}
        <Checkbox
          disabled={disabled || task.entityStatus === "loading"}
          color="success"
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
        />
        <EditableSpan
          disabled={disabled || task.entityStatus === "loading"}
          value={task.title}
          onChange={(title: string) => {
            changeTaskTitle(title);
          }}
        />
      </div>

      <IconButton
        disabled={disabled || task.entityStatus === "loading"}
        color="secondary"
        aria-label="delete"
        onClick={() => {
          removeTask(task.id, todolist.id);
        }}
      >
        X
      </IconButton>
    </ListItem>
  );
};

export default Task;
