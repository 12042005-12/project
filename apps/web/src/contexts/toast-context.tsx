import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface ToastItem {
  id: number;
  title: string;
  description?: string;
}

interface ToastContextValue {
  toasts: ToastItem[];
  pushToast: (toast: Omit<ToastItem, 'id'>) => void;
  dismissToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = Date.now();
    setToasts((current) => [...current, { id, ...toast }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3000);
  };

  const dismissToast = (id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  };

  const value = useMemo(() => ({ toasts, pushToast, dismissToast }), [toasts]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-2">
        {toasts.map((toast) => (
          <div key={toast.id} className="rounded-2xl border border-white/10 bg-slate-900/95 p-4 text-sm text-slate-100 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-white">{toast.title}</p>
                {toast.description ? <p className="mt-1 text-slate-400">{toast.description}</p> : null}
              </div>
              <button onClick={() => dismissToast(toast.id)} className="text-slate-400 hover:text-white">
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
