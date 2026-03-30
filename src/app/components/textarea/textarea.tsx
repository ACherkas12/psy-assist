"use client";
import type { KeyboardEvent } from "react";
import sx from "./textarea.module.css";
import type { TextareaProps } from "./textarea.types";

export const Textarea = (props: TextareaProps) => {
  const { onEnter } = props;

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
      onEnter(event.currentTarget.value);
      event.currentTarget.value = "";
    }
  };

  return (
    <textarea
      className={sx.textarea}
      name="question"
      placeholder="Chat with assistant"
      onKeyDown={onKeyDown}
    />
  );
};
