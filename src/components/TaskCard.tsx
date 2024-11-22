import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const statusColors = {
  PENDING: 'bg-yellow-500',
  IN_PROGRESS: 'bg-blue-500',
  COMPLETED: 'bg-green-500',
};

const statusLabels = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="line-clamp-1">{task.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />
                {format(task.dueDate, 'PPP')}
              </CardDescription>
            </div>
            <Badge variant="secondary" className={statusColors[task.status]}>
              {statusLabels[task.status]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {task.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            {format(task.createdAt, 'PP')}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}