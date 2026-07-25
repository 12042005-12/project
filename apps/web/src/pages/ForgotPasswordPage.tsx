import { ArrowRight, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@ui/index';
import { AppShell } from '../components/app-shell';
import { useToast } from '../contexts/toast-context';
import { requestPasswordReset } from '../services/auth-service';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const { pushToast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await requestPasswordReset(email);
    pushToast({ title: 'Reset link prepared', description: 'Check your inbox for the next steps.' });
  };

  return (
    <AppShell title="Reset your password" description="We will send a secure reset link to your email address." showSidebar={false}>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          <span>Email</span>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2">
            <Mail className="h-4 w-4 text-slate-400" />
            <Input value={email} onChange={(event) => setEmail(event.target.value)} className="border-none bg-transparent px-0 text-white outline-none" placeholder="you@example.com" />
          </div>
        </label>
        <Button type="submit" className="bg-gradient-to-r from-pink-500 to-violet-500 text-white">
          Send reset link <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Link to="/login" className="text-sm text-pink-300">
          Back to sign in
        </Link>
      </form>
    </AppShell>
  );
}
