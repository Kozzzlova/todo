import { setAppStatusAC, setErrorAC } from "app/app-reducer";
import { AppDispatch } from "app/store";
import { Response } from "common/types/types";

export const handleServerError = <T>(dispatch: AppDispatch, data: Response<T>) => {
  dispatch(setAppStatusAC("failed"));
  dispatch(setErrorAC(data.messages.length ? data.messages[0] : "Some error occurred"));
};
