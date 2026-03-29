"use client";
import { KeyboardEvent } from "react";
import sx from "./textarea.module.css";

export const Textarea = () => {
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <textarea className={sx.textarea} name="question" onKeyDown={onKeyDown} />
  );
};
