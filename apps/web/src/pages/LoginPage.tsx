import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@ui/index';
import { AppShell } from '../components/app-shell';
import { useAuth } from '../contexts/auth-context';
import { useToast } from '../contexts/toast-context';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { pushToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(email, password);
      pushToast({ title: 'Signed in', description: 'Welcome back to your style studio.' });
      navigate('/dashboard');
    } catch (error) {
      pushToast({ title: 'Sign-in failed', description: error instanceof Error ? error.message : 'Please try again.' });
    }
  };

  return (
    <AppShell title="Welcome back" description="Sign in to continue planning outfits, managing your wardrobe, and exploring AI recommendations." showSidebar={false}>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <div className="mb-2 flex items-center gap-2 text-sm text-pink-300">
          <Lock className="h-4 w-4" />
          Secure account access
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span>Email</span>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2">
              <Mail className="h-4 w-4 text-slate-400" />
              <Input value={email} onChange={(event) => setEmail(event.target.value)} className="border-none bg-transparent px-0 text-white outline-none" placeholder="you@example.com" />
            </div>
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span>Password</span>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2">
              <Lock className="h-4 w-4 text-slate-400" />
              <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="border-none bg-transparent px-0 text-white outline-none" placeholder="••••••••" />
            </div>
          </label>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-white/20 bg-transparent" />
            Remember me
          </label>
          <div className="flex items-center gap-3">
            <Link to="/forgot-password" className="text-pink-300">
              Forgot password?
            </Link>
            <Link to="/register" className="text-pink-300">
              Need an account?
            </Link>
          </div>
        </div>
        <Button type="submit" className="bg-gradient-to-r from-pink-500 to-violet-500 text-white">
          Sign in <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </AppShell>
  );
}
