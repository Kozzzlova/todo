import List from "@mui/material/List";
import Task from "./Task/Task";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectTasks } from "features/todolists/model/tasksSlice";
import { DomainTodolist } from "features/todolists/model/todolistsSlice";
import { TaskStatus } from "features/todolists/lib/enums/enums";
import { useAppDispatch } from "common/index";

type Props = {
  todolist: DomainTodolist;
};

const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist;
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks)[id];
  // useEffect(() => {
  //   dispatch(fetchTasksTC(id));
  // }, []);

  let tasksForTodolist = tasks;
  if (filter === "active") {
    tasksForTodolist = tasks.filter((task) => task.status === TaskStatus.New);
  }

  if (filter === "completed") {
    tasksForTodolist = tasks.filter((task) => task.status === TaskStatus.Completed);
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return (
              <Task disabled={todolist.entityStatus === "loading"} task={task} key={task.id} todolist={todolist} />
            );
          })}
        </List>
      )}
    </>
  );
};

export default Tasks;
