import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  dueDate: z.date(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  createdAt: z.date(),
});

export type Task = z.infer<typeof TaskSchema>;

export const TaskFormSchema = TaskSchema.omit({ id: true, createdAt: true });

export type TaskFormData = z.infer<typeof TaskFormSchema>;