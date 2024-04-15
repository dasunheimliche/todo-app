import { CheckedState } from "@radix-ui/react-checkbox";

export interface Task {
  id: number;
  content: string;
  checked: CheckedState;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  date: string;
  tasks: Task[];
  tags: Tags;
  archived: boolean;
}

export type Tag = {
  id: string;
  text: string;
};

export type Tags = Tag[];
