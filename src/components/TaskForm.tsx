
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { Task } from './TaskManager';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'completed'>) => void;
  onCancel: () => void;
  categories: string[];
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    priority: 1,
    deadline: '',
    category: 'Pekerjaan'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.deadline) {
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      priority: formData.priority,
      deadline: new Date(formData.deadline),
      category: formData.category
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tambah Tugas Baru</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onCancel}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nama Tugas</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama tugas..."
                required
              />
            </div>

            <div>
              <Label htmlFor="priority">Prioritas (1-5)</Label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value={1}>1 - Prioritas Tertinggi</option>
                <option value={2}>2 - Prioritas Tinggi</option>
                <option value={3}>3 - Prioritas Sedang</option>
                <option value={4}>4 - Prioritas Rendah</option>
                <option value={5}>5 - Prioritas Terendah</option>
              </select>
            </div>

            <div>
              <Label htmlFor="deadline">Tenggat Waktu</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Kategori</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Tambah Tugas
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskForm;
