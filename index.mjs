import Express, { json } from "express";
import cors from "cors";
import pool from "./dbConnection.mjs";
const app = Express();
const port = 5000;

// middleware
app.use(cors());
app.use(Express.json());

// ROUTESSSS

// create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error("error in post todo :", err.message);
  }
});
// get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (err) {
    console.error("error in get all todo :", err);
  }
});
// get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
    res.json(todo.rows);
  } catch (err) {
    console.log("error in todo :", err);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Updated Todo");
  } catch (err) {
    console.error("error in update todo :", err);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("todo deleted successfullyy");
  } catch (err) {
    console.error("error in delete todo :", err);
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
