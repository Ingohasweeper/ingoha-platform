import * as React from "react";

const ToastProvider = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const Toast = ({ children, ...props }: any) => (
  <div className="fixed bottom-4 right-4 bg-slate-800 text-white p-4 rounded-lg shadow-lg" {...props}>
    {children}
  </div>
);

const ToastTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="font-semibold">{children}</div>
);

const ToastDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm text-slate-300">{children}</div>
);

const ToastClose = () => (
  <button className="absolute top-2 right-2 text-slate-400 hover:text-white">
    ×
  </button>
);

const ToastViewport = () => <div />;

export {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
};
