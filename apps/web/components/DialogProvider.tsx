"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from "@shinatga/ui";
import { DialogContext } from "@/hooks/useDialog";

interface DialogState {
  isOpen: boolean;
  title?: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  type: "alert" | "confirm";
  resolve?: (value: boolean) => void;
}

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DialogState>({
    isOpen: false,
    description: "",
    confirmText: "확인",
    type: "alert",
  });

  const showAlert = useCallback((options: {
    title?: string;
    description: string;
    confirmText?: string;
  }) => {
    return new Promise<void>((resolve) => {
      setState({
        isOpen: true,
        title: options.title,
        description: options.description,
        confirmText: options.confirmText || "확인",
        type: "alert",
        resolve: () => {
          resolve();
          return true;
        },
      });
    });
  }, []);

  const showConfirm = useCallback((options: {
    title?: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
  }) => {
    return new Promise<boolean>((resolve) => {
      setState({
        isOpen: true,
        title: options.title,
        description: options.description,
        confirmText: options.confirmText || "확인",
        cancelText: options.cancelText || "취소",
        type: "confirm",
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    state.resolve?.(true);
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleCancel = () => {
    state.resolve?.(false);
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <DialogContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      <Dialog open={state.isOpen} onOpenChange={(open) => {
        if (!open) {
          handleCancel();
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={state.title ? "" : "sr-only"}>
              {state.title || "알림"}
            </DialogTitle>
            <DialogDescription>{state.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {state.type === "confirm" && (
              <Button variant="outline" onClick={handleCancel}>
                {state.cancelText}
              </Button>
            )}
            <Button onClick={handleConfirm}>
              {state.confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
}
