export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  timeBlock: TimeBlock;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export type TimeBlock = 'morning' | 'afternoon' | 'evening' | 'night';

export interface TimeBlockInfo {
  label: string;
  icon: string;
  color: string;
  period: TimeBlock;
}