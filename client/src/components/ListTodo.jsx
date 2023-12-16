import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      //   console.log(response.data);
      setTodos(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deleteTodo = await axios.delete(
        `http://localhost:5000/todos/${id}`
      );
      //   console.log(deleteTodo);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  console.log(todos);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                Todo_Id
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                Description
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                Edit
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                Delete
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.todo_id}>
              <TableCell component="th" scope="row">
                {todo.todo_id}
              </TableCell>
              <TableCell align="right">{todo.description}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="success">
                  <EditTodo todo={todo} />
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(todo.todo_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTodo;
