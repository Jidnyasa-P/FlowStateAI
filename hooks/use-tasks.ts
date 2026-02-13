'use client';

import { useState, useCallback } from 'react';

export interface Task {
  id: string;
  title: string;
  name?: string; // Alias for title
  description?: string;
  status: 'active' | 'paused' | 'completed' | 'failed';
  difficulty: 'easy' | 'medium' | 'hard' | 'Low Load' | 'Moderate Load' | 'High Load';
  progress?: number; // 0-1
  timeSpent: number; // in seconds
  createdAt: Date;
  completedAt?: Date;
  failedAt?: Date;
  errorCount: number;
}

export function useTasks(initialTasks?: Task[]) {
  const [tasks, setTasks] = useState<Task[]>(
    initialTasks || generateMockTasks()
  );

  const addTask = useCallback(
    (title: string, description?: string, difficulty: Task['difficulty'] = 'medium') => {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title,
        description,
        status: 'active',
        difficulty,
        timeSpent: 0,
        createdAt: new Date(),
        errorCount: 0,
      };
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    },
    []
  );

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }, []);

  const completeTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: 'completed', completedAt: new Date() }
          : task
      )
    );
  }, []);

  const failTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: 'failed', failedAt: new Date() }
          : task
      )
    );
  }, []);

  const recordError = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, errorCount: task.errorCount + 1 }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // Calculate stats
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    active: tasks.filter((t) => t.status === 'active').length,
    totalErrors: tasks.reduce((sum, t) => sum + t.errorCount, 0),
  };

  return {
    tasks,
    addTask,
    updateTask,
    completeTask,
    failTask,
    recordError,
    deleteTask,
    stats,
  };
}

function generateMockTasks(): Task[] {
  const now = new Date();
  return [
    {
      id: 'task-1',
      title: 'Design Dashboard Layout',
      description: 'Create responsive design for main dashboard',
      status: 'completed',
      difficulty: 'hard',
      timeSpent: 3600,
      createdAt: new Date(now.getTime() - 86400000),
      completedAt: new Date(now.getTime() - 82800000),
      errorCount: 1,
    },
    {
      id: 'task-2',
      title: 'Implement Energy Calculator',
      description: 'Build PPT-aligned energy formula',
      status: 'completed',
      difficulty: 'medium',
      timeSpent: 2400,
      createdAt: new Date(now.getTime() - 82800000),
      completedAt: new Date(now.getTime() - 79200000),
      errorCount: 0,
    },
    {
      id: 'task-3',
      title: 'Setup Database Schema',
      description: 'Create tables for users and tasks',
      status: 'active',
      difficulty: 'medium',
      timeSpent: 1200,
      createdAt: new Date(now.getTime() - 3600000),
      errorCount: 2,
    },
    {
      id: 'task-4',
      title: 'Write API Documentation',
      description: 'Document all REST endpoints',
      status: 'active',
      difficulty: 'easy',
      timeSpent: 600,
      createdAt: new Date(now.getTime() - 1800000),
      errorCount: 0,
    },
  ];
}
