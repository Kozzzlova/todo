import { SyntheticEvent, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectError } from "app/appSelectors";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { setErrorAC } from "app/app-reducer";

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setErrorAC(null));
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
