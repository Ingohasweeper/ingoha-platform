import { useState } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (props: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...props, id }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  return { toasts, toast };
}
