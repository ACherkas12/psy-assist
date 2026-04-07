"use client";
import { type KeyboardEvent, useId } from "react";
import sx from "./textarea.module.css";
import type { TextareaProps } from "./textarea.types";
import { waistPathObjectBoundingBox } from "./textarea.shape";

export const Textarea = (props: TextareaProps) => {
  const { onEnter } = props;
  const clipId = `textarea-waist-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const clipPath = waistPathObjectBoundingBox();

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onEnter(event.currentTarget.value);
      event.currentTarget.form?.requestSubmit();
      event.currentTarget.value = "";
    }
  };

  return (
    <div className={sx.wrapper} style={{ clipPath: `url(#${clipId})` }}>
      <svg className={sx.svgDefs} aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={clipPath} />
          </clipPath>
        </defs>
      </svg>
      <textarea
        className={sx.textarea}
        name="question"
        placeholder="Chat with assistant"
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
