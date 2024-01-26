/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import express from 'express';
import * as path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/todo_app', {})
    console.log("CONNECTED TO DATABASE SUCCESSFULLY!");
  } catch (error: any) {
    console.error('COULD NOT CONNECT TO DATABASE:', error.message);
  }
};
connectDb();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to todo-backend!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
