// import {Button} from "./Button";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type Props = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm = ({ addItem, disabled }: Props) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addItemHandler();
    }
  };

  const buttonStyle = {
    minWidth: "38px",
    minHeight: "38px",
  };

  return (
    <div>
      <TextField
        error={!!error}
        //id="outlined-basic"
        label={error ? error : "Enter a title"}
        // helperText={error}
        variant="outlined"
        size={"small"}
        className={error ? "error" : ""}
        value={title}
        onChange={changeItemHandler}
        onKeyUp={addItemOnKeyUpHandler}
        sx={{ height: "30px" }}
        disabled={disabled}
      />

      {/*<Button title={'+'} onClick={addItemHandler}/>*/}
      <Button disabled={disabled} onClick={addItemHandler} variant="contained" style={buttonStyle}>
        +
      </Button>
      {/* {error && <div className={'error-message'}>{error}</div>} */}
    </div>
  );
};
