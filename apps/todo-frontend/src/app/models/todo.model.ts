export interface Todo {
    _id?: string;
    title: string;
    description: string;
    created_at?: Date;
    updated_at?: Date;
    completed?: boolean;
  }