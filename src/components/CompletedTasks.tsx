
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar } from 'lucide-react';
import { Task } from './TaskManager';

interface CompletedTasksProps {
  tasks: Task[];
  getPriorityColor: (priority: number) => string;
  formatDate: (date: Date) => string;
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ 
  tasks, 
  getPriorityColor, 
  formatDate 
}) => {
  if (tasks.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <div className="text-gray-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Belum ada tugas yang selesai. Selesaikan beberapa tugas untuk melihatnya di sini!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <CardHeader className="px-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Tugas Selesai ({tasks.length})
        </CardTitle>
      </CardHeader>
      
      {tasks.map((task) => (
        <Card key={task.id} className="bg-green-50 border-green-200">
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
                  <Badge className="bg-green-600 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Selesai
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-through decoration-green-500">
                  {task.name}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Tenggat dulu: {formatDate(task.deadline)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CompletedTasks;
