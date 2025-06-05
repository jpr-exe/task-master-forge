
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Trash2, Calendar, Flag } from 'lucide-react';
import { Task } from './TaskManager';

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  getPriorityColor: (priority: number) => string;
  formatDate: (date: Date) => string;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onComplete, 
  onDelete, 
  getPriorityColor, 
  formatDate 
}) => {
  const isOverdue = (date: Date) => {
    return date < new Date() && date.toDateString() !== new Date().toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  if (tasks.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <div className="text-gray-500">
            <Flag className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Tidak ada tugas yang ditemukan. Tambahkan tugas baru untuk memulai!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card 
          key={task.id} 
          className={`transition-all hover:shadow-md ${
            isOverdue(task.deadline) ? 'ring-2 ring-red-200 bg-red-50' : 
            isToday(task.deadline) ? 'ring-2 ring-yellow-200 bg-yellow-50' : ''
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline" className="text-xs">
                    #{task.id}
                  </Badge>
                  <Badge className={`text-white ${getPriorityColor(task.priority)}`}>
                    Prioritas {task.priority}
                  </Badge>
                  <Badge variant="secondary">
                    {task.category}
                  </Badge>
                  {isOverdue(task.deadline) && (
                    <Badge variant="destructive">
                      Terlambat
                    </Badge>
                  )}
                  {isToday(task.deadline) && (
                    <Badge className="bg-yellow-500 text-white">
                      Tenggat Hari Ini
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {task.name}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Tenggat: {formatDate(task.deadline)}</span>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <Button
                  onClick={() => onComplete(task.id)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Selesai
                </Button>
                <Button
                  onClick={() => onDelete(task.id)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Hapus
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
