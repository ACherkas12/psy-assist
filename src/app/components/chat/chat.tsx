"use client";
import { type SubmitEvent, useState } from "react";
import { sendMessage } from "@/app/config/ollama";
import { Textarea } from "../textarea/textarea";
import sx from "./chat.module.css";
import { type ChatMessage, createMessage } from "./chat.utils";

export const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const textarea = event.currentTarget.elements.namedItem("question");
    const question = (textarea as HTMLTextAreaElement).value;
    const message = createMessage("assistant", "");

    setMessages((prevState) => [...prevState, message]);

    sendMessage(question).then(async (response) => {
      for await (const chunk of response) {
        message.content += chunk.message.content;

        setMessages((prevState) => {
          return prevState.map((item) =>
            item.id === message.id ? { ...message } : item,
          );
        });
      }

      setIsLoading(false);
    });
  };

  const onEnter = (message: string) => {
    setMessages((prevState) => [...prevState, createMessage("user", message)]);
  };

  return (
    <>
      {!messages.length && (
        <h2 className={sx.title}>How can I help you today?</h2>
      )}

      <ul className={sx.messages}>
        {messages.map((message) => (
          <li key={message.id} className={sx.message} data-role={message.role}>
            {message.content}
          </li>
        ))}
      </ul>

      <form className={sx.form} onSubmit={onSubmit}>
        <Textarea onEnter={onEnter} />
      </form>
    </>
  );
};
