import { AddItemForm } from "common/components";
import Tasks from "./Tasks/Tasks";
import TodolistTItle from "./TodolistTitle/TodolistTItle";
import FilterTasksButtons from "./FilterTasksButtons/FilterTasksButtons";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { addTaskTC } from "features/todolists/model/tasksSlice";
import { DomainTodolist } from "features/todolists/model/todolistsSlice";

type PropsType = {
  todolist: DomainTodolist;
};

export const Todolist = (props: PropsType) => {
  const { todolist } = props;
  const { id, entityStatus } = todolist;
  const dispatch = useAppDispatch();

  const addTask = (title: string) => {
    dispatch(addTaskTC({ title, todolistId: id }));
  };

  return (
    <div>
      {" "}
      <TodolistTItle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
};
