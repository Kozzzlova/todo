import { TaskPriority, TaskStatus } from "../lib/enums/enums";

export type DomainTask = {
  description: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type GetTaskResponse = {
  error: string | null;
  totalCount: number;
  items: DomainTask[];
};
export type UpdateTaskModel = {
  description: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
};
