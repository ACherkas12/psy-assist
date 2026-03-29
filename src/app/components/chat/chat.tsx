"use client";
import { SubmitEvent, useState } from "react";
import { Message } from "ollama";
import { Textarea } from "../textarea/textarea";
import { sendMessage } from "@/app/config/ollama";
import sx from "./chat.module.css";

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const textarea = event.currentTarget.elements.namedItem("question");
    const question = (textarea as HTMLTextAreaElement).value;

    sendMessage(question).then(async (response) => {
      let message = "";

      for await (const chunk of response) {
        message += chunk.message.content;
        setMessages([...messages, { role: "assistant", content: message }]);
      }

      setIsLoading(false);
    });
  };

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li>{message.content}</li>
        ))}
      </ul>

      <form className={sx.form} onSubmit={onSubmit}>
        <Textarea />
      </form>
    </>
  );
};
