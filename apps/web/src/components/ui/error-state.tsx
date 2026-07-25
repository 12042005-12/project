import { AlertCircle } from 'lucide-react';

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
      <AlertCircle className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
}
