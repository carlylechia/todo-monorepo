/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import * as path from 'path';
import todoRoutes from './routes/todo.routes';


const app = express();
app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
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

app.use('/api', todoRoutes);

app.use(function(req, res){
  res.send(404);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
