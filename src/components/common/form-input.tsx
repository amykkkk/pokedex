import React, { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  text: string;
}
export default function FormInput({ label, text, ...props }: IInput) {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="text-text mb-2 block text-sm font-semibold"
      >
        {text}
      </label>
      <input
        className="border-border bg-search placeholder:text-text/50 focus:border-accent focus:ring-accent/50 w-full rounded-lg border px-3 py-2 text-sm text-gray-600 transition outline-none focus:ring-2 dark:text-gray-200"
        {...props}
      />
    </div>
  );
}
