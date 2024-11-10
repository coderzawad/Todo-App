import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TimeBlock, Todo } from '../types';

interface AddTodoFormProps {
  onAdd: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [timeBlock, setTimeBlock] = useState<TimeBlock>('morning');
  const [priority, setPriority] = useState<Todo['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAdd({
      text: text.trim(),
      completed: false,
      timeBlock,
      priority
    });

    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>
        
        <div className="flex gap-4">
          <select
            value={timeBlock}
            onChange={(e) => setTimeBlock(e.target.value as TimeBlock)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Todo['priority'])}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
      </div>
    </form>
  );
}