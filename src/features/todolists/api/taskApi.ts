import { Response } from "common";
import { GetTaskResponse, DomainTask, UpdateTaskModel } from "./tasksApi.types";
import { instance } from "common";
import { UpdateTaskDomainModel } from "../model/tasksSlice";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload;
    return instance.post<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title });
  },
  removeTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload;
    return instance.delete<Response>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { taskId, todolistId, model } = payload;
    return instance.put<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};
