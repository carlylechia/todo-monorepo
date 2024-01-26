import { Document, Schema, model } from 'mongoose';
interface Todo extends Document {
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

const todoSchema = new Schema<Todo>(
  {
    title: { type: String, required: true, maxlength: 255 },
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const TodoModel = model<Todo>('Todo', todoSchema);
