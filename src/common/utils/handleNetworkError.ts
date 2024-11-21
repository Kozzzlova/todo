import { setAppStatus, setError } from "app/appSlice";
import { AppDispatch } from "app/store";

export const handleNetworkError = (dispatch: AppDispatch, err: { message: string }) => {
  dispatch(setError({ error: err.message }));
  dispatch(setAppStatus({ status: "failed" }));
};
