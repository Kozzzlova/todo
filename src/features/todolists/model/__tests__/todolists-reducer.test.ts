import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  DomainTodolist,
  removeTodolist,
  todolistsReducer,
} from "../todolistsSlice";

let startState: DomainTodolist[] = [];

beforeEach(() => {
  startState = [
    { title: "HTML", order: 0, addedDate: "", id: "1", filter: "all", entityStatus: "idle" },
    { title: "CSS", order: 0, addedDate: "", id: "2", filter: "all", entityStatus: "idle" },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolist({ id: "1" }));
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe("2");
});

test("correct todolist should be added", () => {
  const newTodolist = { title: "REACT", order: 0, addedDate: "", id: "3", filter: "all" };
  const endState = todolistsReducer(startState, addTodolist({ todolist: newTodolist }));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("REACT");
});

test("correct todolist should change its name", () => {
  const endState = todolistsReducer(startState, changeTodolistTitle({ id: "2", title: "New Todolist" }));

  expect(endState[0].title).toBe("HTML");
  expect(endState[1].title).toBe("New Todolist");
});

test("correct filter of todolist should be changed", () => {
  const endState = todolistsReducer(startState, changeTodolistFilter({ id: "2", filter: "completed" }));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe("completed");
});
