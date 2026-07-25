import { ArrowRight, Mail, UserCircle2, Lock } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@ui/index';
import { AppShell } from '../components/app-shell';
import { useAuth } from '../contexts/auth-context';
import { useToast } from '../contexts/toast-context';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const { pushToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await register(name, email, password);
      pushToast({ title: 'Account created', description: 'Your style profile is ready.' });
      navigate('/dashboard');
    } catch (error) {
      pushToast({ title: 'Registration failed', description: error instanceof Error ? error.message : 'Please try again.' });
    }
  };

  return (
    <AppShell title="Create your account" description="Join the AI styling experience and start organizing your wardrobe with confidence." showSidebar={false}>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span>Full name</span>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2">
              <UserCircle2 className="h-4 w-4 text-slate-400" />
              <Input value={name} onChange={(event) => setName(event.target.value)} className="border-none bg-transparent px-0 text-white outline-none" placeholder="Ava Chen" />
            </div>
          </label>
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
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span>Confirm password</span>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2">
              <Lock className="h-4 w-4 text-slate-400" />
              <Input type="password" className="border-none bg-transparent px-0 text-white outline-none" placeholder="••••••••" />
            </div>
          </label>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
          <p>Already registered?</p>
          <Link to="/login" className="text-pink-300">
            Sign in instead
          </Link>
        </div>
        <Button type="submit" className="bg-gradient-to-r from-pink-500 to-violet-500 text-white">
          Create account <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </AppShell>
  );
}
