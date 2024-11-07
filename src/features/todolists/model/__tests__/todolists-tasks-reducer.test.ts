import { Todolist } from "features/todolists/api/todolistsApi.types";
import { tasksReducer, TasksStateType } from "../tasks-reducer";
import { addTodolistAC, DomainTodolist, todolistsReducer } from "../todolists-reducer";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: DomainTodolist[] = [];
  const newTodolist: Todolist = { title: "NEW TODOLIST", order: 0, addedDate: "", id: "NEW ID" };

  const endTasksState = tasksReducer(startTasksState, addTodolistAC({ todolist: newTodolist }));
  const endTodolistsState = todolistsReducer(startTodolistsState, addTodolistAC({ todolist: newTodolist }));

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe("NEW ID");
  expect(endTodolistsState[0].title).toBe("NEW TODOLIST");
  expect(idFromTodolists).toBe("NEW ID");
  0;
});
