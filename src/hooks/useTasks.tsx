
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  description?: string;
  task_date: string;
  task_time: string;
  task_type: 'study' | 'meet' | 'project' | 'assignment';
  status: 'pending' | 'completed' | 'failed' | 'not_marked';
  created_at: string;
}

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user?.id)
        .order('task_date', { ascending: true });

      if (error) throw error;
      
      // Type cast the data to ensure it matches our Task interface
      const typedTasks = (data || []).map(task => ({
        ...task,
        task_type: task.task_type as 'study' | 'meet' | 'project' | 'assignment',
        status: task.status as 'pending' | 'completed' | 'failed' | 'not_marked'
      }));
      
      setTasks(typedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Omit<Task, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...taskData, user_id: user?.id }])
        .select()
        .single();

      if (error) throw error;
      
      const typedTask = {
        ...data,
        task_type: data.task_type as 'study' | 'meet' | 'project' | 'assignment',
        status: data.status as 'pending' | 'completed' | 'failed' | 'not_marked'
      };
      
      setTasks(prev => [...prev, typedTask]);
      toast.success('Task created successfully!');
      return typedTask;
    } catch (error: any) {
      toast.error('Failed to create task: ' + error.message);
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) throw error;
      
      const typedTask = {
        ...data,
        task_type: data.task_type as 'study' | 'meet' | 'project' | 'assignment',
        status: data.status as 'pending' | 'completed' | 'failed' | 'not_marked'
      };
      
      setTasks(prev => prev.map(task => task.id === id ? typedTask : task));
      toast.success('Task updated successfully!');
      return typedTask;
    } catch (error: any) {
      toast.error('Failed to update task: ' + error.message);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (error: any) {
      toast.error('Failed to delete task: ' + error.message);
      throw error;
    }
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    refetchTasks: fetchTasks
  };
};
