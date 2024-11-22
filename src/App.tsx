import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { Task, TaskFormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { TaskCard } from '@/components/TaskCard';
import { TaskDialog } from '@/components/TaskDialog';
import { TaskFilters } from '@/components/TaskFilters';
import { Toaster } from '@/components/ui/toaster';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [taskToDelete, setTaskToDelete] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(
        JSON.parse(savedTasks).map((task: Task) => ({
          ...task,
          dueDate: new Date(task.dueDate),
          createdAt: new Date(task.createdAt),
        }))
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (data: TaskFormData) => {
    if (selectedTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === selectedTask.id ? { ...task, ...data } : task
        )
      );
      toast({
        title: 'Task updated',
        description: 'Your task has been updated successfully.',
      });
    } else {
      const newTask: Task = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };
      setTasks((prev) => [...prev, newTask]);
      toast({
        title: 'Task created',
        description: 'Your task has been created successfully.',
      });
    }
    setDialogOpen(false);
    setSelectedTask(undefined);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTaskToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      setTasks((prev) => prev.filter((task) => task.id !== taskToDelete));
      toast({
        title: 'Task deleted',
        description: 'Your task has been deleted successfully.',
        variant: 'destructive',
      });
    }
    setDeleteDialogOpen(false);
    setTaskToDelete(undefined);
  };

  const filteredTasks = tasks
    .filter((task) => statusFilter === 'ALL' || task.status === statusFilter)
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.dueDate.getTime() - b.dueDate.getTime()
        : b.dueDate.getTime() - a.dueDate.getTime()
    );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Task Tracker</h1>
          <Button onClick={() => setDialogOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </div>

        <div className="mb-6">
          <TaskFilters
            statusFilter={statusFilter}
            sortOrder={sortOrder}
            onStatusFilterChange={setStatusFilter}
            onSortOrderChange={setSortOrder}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center text-muted-foreground mt-8">
            No tasks found. Add a new task to get started!
          </div>
        )}

        <TaskDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleSubmit}
          task={selectedTask}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the task.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Toaster />
      </div>
    </div>
  );
}

export default App;