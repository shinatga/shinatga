"use client";

import { createContext, useContext } from "react";

interface DialogOptions {
  title?: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

interface DialogContextValue {
  showAlert: (options: DialogOptions) => Promise<void>;
  showConfirm: (options: DialogOptions) => Promise<boolean>;
}

export const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within DialogProvider");
  }
  return context;
}
