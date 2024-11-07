import { instance, Response } from "common/index";
import { LoginArgs } from "./authApi.types";

export const authApi = {
  login(payload: LoginArgs) {
    return instance.post<Response<{ userId: string; token: string }>>("auth/login", payload);
  },
  logout() {
    return instance.delete<Response>("auth/login");
  },
  me() {
    return instance.get<Response<{ id: number; email: string; login: string }>>("auth/me");
  },
};
