import { addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC } from "../tasks-reducer";
import { addTodolistAC, removeTodolistAC } from "../todolists-reducer";
import { TaskPriority, TaskStatus } from "features/todolists/lib/enums/enums";
import { Todolist } from "features/todolists/api/todolistsApi.types";

let startState: TasksStateType = {};
beforeEach(() => {
  startState = {
    "1": [
      {
        id: "1",
        title: "HTML",
        description: "",
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "1",
        order: 1,
        addedDate: "",
      },
      {
        id: "2",
        title: "CSS",
        description: "",
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "1",
        order: 1,
        addedDate: "",
      },
    ],
    "2": [
      {
        id: "1",
        title: "JS",
        description: "",
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "2",
        order: 1,
        addedDate: "",
      },
      {
        id: "2",
        title: "REACT",
        description: "",
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "2",
        order: 1,
        addedDate: "",
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const todolistId1 = "1";
  const endState = tasksReducer(startState, removeTaskAC({ todolistId: todolistId1, taskId: "1" }));

  expect(endState[todolistId1].length).toBe(1);
  expect(endState[todolistId1][0].title).toBe("CSS");
});

test("correct task should be added to correct array", () => {
  const todolistId1 = "1";
  const newTask = {
    id: "3",
    title: "NEW TASK",
    description: "",
    status: TaskStatus.New,
    priority: TaskPriority.Low,
    startDate: "",
    deadline: "",
    todoListId: "1",
    order: 1,
    addedDate: "",
  };
  const endState = tasksReducer(startState, addTaskAC({ task: newTask }));

  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId1][0].title).toBe("NEW TASK");
  expect(endState[todolistId1][0].status).toBe(0);
});

test("status of specified task should be changed", () => {
  const todolistId1 = "1";
  const updatedTask = {
    title: "UPDATED TASK",
    status: TaskStatus.New,
  };
  const endState = tasksReducer(
    startState,
    updateTaskAC({
      todolistId: "1",
      taskId: "1",
      model: updatedTask,
    }),
  );

  expect(endState[todolistId1][0].status).toBe(0);
  expect(endState[todolistId1][0].title).toBe("UPDATED TASK");
});

test("new array should be added when new todolist is added", () => {
  const newTodolist: Todolist = { title: "NEW TODOLIST", order: 0, addedDate: "", id: "NEW ID" };
  const endState = tasksReducer(startState, addTodolistAC({ todolist: newTodolist }));

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "1" && k !== "2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
});

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(startState, removeTodolistAC({ id: "2" }));

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["2"]).toBeUndefined();
});
