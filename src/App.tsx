import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { Todo, TimeBlock, TimeBlockInfo } from './types';
import { storage } from './utils/storage';
import { AddTodoForm } from './components/AddTodoForm';
import { TimeBlockSection } from './components/TimeBlockSection';

const timeBlocks: TimeBlockInfo[] = [
  { label: 'Morning', icon: 'Sun', color: 'bg-yellow-500', period: 'morning' },
  { label: 'Afternoon', icon: 'Sun', color: 'bg-orange-500', period: 'afternoon' },
  { label: 'Evening', icon: 'Sunset', color: 'bg-purple-500', period: 'evening' },
  { label: 'Night', icon: 'Moon', color: 'bg-indigo-500', period: 'night' },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(storage.getTodos());

  useEffect(() => {
    storage.setTodos(todos);
  }, [todos]);

  const handleAddTodo = (newTodo: Omit<Todo, 'id' | 'createdAt'>) => {
    const todo: Todo = {
      ...newTodo,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTodos(prev => [...prev, todo]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const completionPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800">Time Block Todo</h1>
        </div>

        {totalCount > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Overall Progress</span>
              <span className="text-blue-500 font-semibold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        <AddTodoForm onAdd={handleAddTodo} />

        {timeBlocks.map(block => (
          <TimeBlockSection
            key={block.period}
            block={block}
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;