import type { Message } from "ollama";

export type ChatMessage = Message & {
  id: string;
};

export const createMessage = (role: string, content: string): ChatMessage => {
  return {
    id: crypto.randomUUID(),
    role,
    content,
  };
};
