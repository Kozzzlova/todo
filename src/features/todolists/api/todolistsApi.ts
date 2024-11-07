import axios from "axios";
import { Todolist } from "./todolistsApi.types";
import { instance } from "common";
import { Response } from "common";

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<
      Response<{
        item: Todolist;
      }>
    >("todo-lists", { title });
  },

  removeTodolist(id: string) {
    return instance.delete<Response>(`todo-lists/${id}`);
  },

  updateTodolist(payload: { id: string; title: string }) {
    const { id, title } = payload;
    return instance.put<Response>(`todo-lists/${id}`, { title });
  },
};
