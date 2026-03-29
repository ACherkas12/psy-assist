"use server";
import { Ollama } from "ollama";

const HOST = "http://localhost:11434";
const MODEL = "deepseek-r1:8b";

const ollama = new Ollama({
  host: HOST,
});

export const listModels = async () => {
  return ollama.list();
};

export const sendMessage = async (message: string) => {
  return ollama.chat({
    model: MODEL,
    messages: [{ role: "user", content: message }],
    stream: true,
  });
};
