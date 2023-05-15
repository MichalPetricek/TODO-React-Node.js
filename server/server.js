PORT = process.env.PORT || 8000;
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const {v4: uuidv4} = require('uuid');

app.use(cors());
app.use(express.json());

//get all todos
app.get('/todos/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    try {
        const todos = await pool.query(`SELECT * FROM todos WHERE user_email = $1`, [userEmail]);
        res.json(todos.rows);
    } catch (error) {
        console.error(error);
    }
})
//create new todo
app.post('/todos/', async (req, res) => {
    const { userEmail, title, progress, date } = req.body;
    const id = uuidv4();
    console.log({ userEmail, title, progress, date });
    try {
        const newTodo = await pool.query(`INSERT INTO todos (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)`, [id, userEmail, title, progress, date]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error);
    }
})
//edit todo
app.put('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const { userEmail, title, progress, date } = req.body;
    console.log({ userEmail, title, progress, date });
    try {
      const updatedTodo = await pool.query(`UPDATE todos SET user_email=$1, title=$2, progress=$3, date=$4 WHERE id=$5 RETURNING *`, [userEmail, title, progress, date, id]);
      res.json(updatedTodo.rows[0]);
    } catch (error) {
      console.error(error);
    }
  });
//delete todo
app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const deletedTodo = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
      res.json(deletedTodo.rows[0]);
    } catch (error) {
      console.error(error);
    }
  });
app.listen(PORT, () => console.log("Server is running on port " + PORT));