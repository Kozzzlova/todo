import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  DomainTodolist,
  removeTodolistAC,
  todolistsReducer,
} from "../todolists-reducer";

let startState: DomainTodolist[] = [];

beforeEach(() => {
  startState = [
    { title: "HTML", order: 0, addedDate: "", id: "1", filter: "all" },
    { title: "CSS", order: 0, addedDate: "", id: "2", filter: "all" },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolistAC({ id: "1" }));
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe("2");
});

test("correct todolist should be added", () => {
  const newTodolist = { title: "REACT", order: 0, addedDate: "", id: "3", filter: "all" };
  const endState = todolistsReducer(startState, addTodolistAC({ todolist: newTodolist }));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("REACT");
});

test("correct todolist should change its name", () => {
  const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: "2", title: "New Todolist" }));

  expect(endState[0].title).toBe("HTML");
  expect(endState[1].title).toBe("New Todolist");
});

test("correct filter of todolist should be changed", () => {
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: "2", filter: "completed" }));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe("completed");
});
