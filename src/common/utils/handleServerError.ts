import { setAppStatus, setError } from "app/appSlice";
import { AppDispatch } from "app/store";
import { Response } from "common/types/types";

export const handleServerError = <T>(dispatch: AppDispatch, data: Response<T>) => {
  dispatch(setAppStatus({ status: "failed" }));
  dispatch(setError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
};
