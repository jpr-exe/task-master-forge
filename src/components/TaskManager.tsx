
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Plus, 
  Search, 
  Calendar, 
  Check, 
  Trash2, 
  Undo2, 
  Filter,
  ArrowUpDown,
  Code
} from 'lucide-react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import CompletedTasks from './CompletedTasks';

export interface Task {
  id: number;
  name: string;
  priority: number;
  deadline: Date;
  category: string;
  completed: boolean;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortBy, setSortBy] = useState<'priority' | 'deadline' | 'name'>('priority');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [taskCounter, setTaskCounter] = useState(1);

  const categories = ['Work', 'Personal', 'Study', 'Health', 'Shopping', 'Other'];

  useEffect(() => {
    // Load sample tasks
    const sampleTasks: Task[] = [
      {
        id: 1,
        name: 'Complete React Project',
        priority: 1,
        deadline: new Date('2024-06-10'),
        category: 'Work',
        completed: false
      },
      {
        id: 2,
        name: 'Buy Groceries',
        priority: 3,
        deadline: new Date('2024-06-08'),
        category: 'Shopping',
        completed: false
      },
      {
        id: 3,
        name: 'Study Data Structures',
        priority: 2,
        deadline: new Date('2024-06-15'),
        category: 'Study',
        completed: false
      }
    ];
    setTasks(sampleTasks);
    setTaskCounter(4);
  }, []);

  const addTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: taskCounter,
      completed: false
    };
    
    // Insert task in priority order (lower number = higher priority)
    const newTasks = [...tasks, newTask].sort((a, b) => a.priority - b.priority);
    setTasks(newTasks);
    setTaskCounter(prev => prev + 1);
    setShowAddForm(false);
    
    toast.success(`Task "${taskData.name}" added successfully with ID ${taskCounter}`);
  };

  const deleteTask = (id: number) => {
    const taskToDelete = tasks.find(task => task.id === id);
    if (taskToDelete) {
      setTasks(tasks.filter(task => task.id !== id));
      setDeletedTasks([taskToDelete, ...deletedTasks]);
      toast.success(`Task "${taskToDelete.name}" deleted and can be undone`);
    }
  };

  const completeTask = (id: number) => {
    const taskToComplete = tasks.find(task => task.id === id);
    if (taskToComplete) {
      setTasks(tasks.filter(task => task.id !== id));
      setCompletedTasks([{ ...taskToComplete, completed: true }, ...completedTasks]);
      toast.success(`Task "${taskToComplete.name}" completed!`);
    }
  };

  const undoDelete = () => {
    if (deletedTasks.length > 0) {
      const taskToRestore = deletedTasks[0];
      setDeletedTasks(deletedTasks.slice(1));
      const newTasks = [...tasks, taskToRestore].sort((a, b) => a.priority - b.priority);
      setTasks(newTasks);
      toast.success(`Task "${taskToRestore.name}" restored`);
    } else {
      toast.error('No tasks to undo');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        return a.priority - b.priority;
      case 'deadline':
        return a.deadline.getTime() - b.deadline.getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-blue-500';
      case 5: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Task Master Forge
          </h1>
          <p className="text-gray-600">
            Advanced Task Management System - Web Version of C++ Implementation
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Code className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-blue-600 font-medium">
              C++ Source Code Available in /cpp-source folder
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tasks by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'priority' | 'deadline' | 'name')}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="priority">Sort by Priority</option>
            <option value="deadline">Sort by Deadline</option>
            <option value="name">Sort by Name</option>
          </select>

          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>

          <Button 
            onClick={undoDelete}
            variant="outline"
            disabled={deletedTasks.length === 0}
          >
            <Undo2 className="h-4 w-4 mr-2" />
            Undo Delete ({deletedTasks.length})
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
              <div className="text-sm text-gray-600">Active Tasks</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{deletedTasks.length}</div>
              <div className="text-sm text-gray-600">Can Undo</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{taskCounter - 1}</div>
              <div className="text-sm text-gray-600">Total Created</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Tasks</TabsTrigger>
            <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-6">
            <TaskList 
              tasks={sortedTasks}
              onComplete={completeTask}
              onDelete={deleteTask}
              getPriorityColor={getPriorityColor}
              formatDate={formatDate}
            />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <CompletedTasks 
              tasks={completedTasks}
              getPriorityColor={getPriorityColor}
              formatDate={formatDate}
            />
          </TabsContent>
        </Tabs>

        {/* Add Task Modal */}
        {showAddForm && (
          <TaskForm
            onSubmit={addTask}
            onCancel={() => setShowAddForm(false)}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default TaskManager;
