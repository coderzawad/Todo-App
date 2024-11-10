import React from 'react';
import { Sun, Sunset, Moon, Stars } from 'lucide-react';
import { TimeBlock, TimeBlockInfo, Todo } from '../types';

const timeBlocks: TimeBlockInfo[] = [
  { label: 'Morning', icon: 'Sun', color: 'bg-yellow-500', period: 'morning' },
  { label: 'Afternoon', icon: 'Sun', color: 'bg-orange-500', period: 'afternoon' },
  { label: 'Evening', icon: 'Sunset', color: 'bg-purple-500', period: 'evening' },
  { label: 'Night', icon: 'Moon', color: 'bg-indigo-500', period: 'night' },
];

const IconMap = {
  Sun,
  Sunset,
  Moon,
  Stars,
};

interface TimeBlockSectionProps {
  block: TimeBlockInfo;
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TimeBlockSection({ block, todos, onToggle, onDelete }: TimeBlockSectionProps) {
  const Icon = IconMap[block.icon as keyof typeof IconMap];
  const filteredTodos = todos.filter(todo => todo.timeBlock === block.period);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className={`p-2 rounded-lg ${block.color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{block.label}</h2>
        <span className="ml-auto text-sm text-gray-500">
          {filteredTodos.length} tasks
        </span>
      </div>
      
      <div className="space-y-2">
        {filteredTodos.map(todo => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="w-5 h-5 rounded-full border-2 border-gray-300 checked:bg-blue-500 checked:border-blue-500 transition-colors cursor-pointer"
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {todo.text}
            </span>
            <div className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(todo.priority)}`}>
              {todo.priority}
            </div>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function getPriorityColor(priority: Todo['priority']): string {
  const colors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };
  return colors[priority];
}