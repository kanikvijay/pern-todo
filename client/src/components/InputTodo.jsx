import React, { useState } from "react";

import axios from "axios";
import { Typography, FormControl, TextField, Button } from "@mui/material";
const InputTodo = () => {
  const [description, setDescription] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/todos", {
        description,
      });
      console.log(response.data.description);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Typography>Pern Todo List</Typography>
      <FormControl>
        <TextField
          label="Make todo"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" onClick={onSubmitHandler}>
          Add
        </Button>
      </FormControl>
    </>
  );
};

export default InputTodo;
