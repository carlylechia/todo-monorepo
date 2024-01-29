import { Router, Request, Response } from 'express';
import { TodoModel } from '../models/todo.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.redirect('/api/todos')
})

router.get('/todos', async (req: Request, res: Response) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/todos/:id', async (req: Request, res: Response) => {
    try {
      const todo = await TodoModel.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.post('/todos', async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    const newTodo = new TodoModel({
      title,
      description,
    });

    const savedTodo = await newTodo.save();

    res.json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.patch('/todos/:id/toggleStatus', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findById(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    todo.completed = !todo.completed;

    const updatedTodo = await todo.save();

    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/todos/:id', async (req: Request, res: Response) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: new Date() },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/todos/:id', async (req: Request, res: Response) => {
  try {
    await TodoModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
