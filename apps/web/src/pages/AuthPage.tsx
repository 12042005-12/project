import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, UserCircle2 } from 'lucide-react';
import { Button, Input } from '@ui/index';
import { useAuth } from '../contexts/auth-context';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginForm) => {
    try {
      setError(null);
      await login(values.email, values.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.2),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_55%,_#1f2937)] p-4 text-slate-100 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30 md:p-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">Welcome back</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Access your style studio</h1>
          </div>
          <Link to="/" className="text-sm text-slate-400 hover:text-white">Back home</Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">A smarter wardrobe starts here</h2>
            <p className="mt-3 text-sm text-slate-400">Track your closet, save outfits, and receive AI recommendations without leaving your browser.</p>
          </div>
          <form className="space-y-4 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6" onSubmit={handleSubmit(onSubmit)}>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              <span>Email</span>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <Input className="border-none bg-transparent px-0 text-white outline-none" placeholder="you@example.com" {...register('email')} />
              </div>
              {errors.email ? <span className="text-xs text-red-300">{errors.email.message}</span> : null}
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              <span>Password</span>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2">
                <Lock className="h-4 w-4 text-slate-400" />
                <Input type="password" className="border-none bg-transparent px-0 text-white outline-none" placeholder="••••••••" {...register('password')} />
              </div>
              {errors.password ? <span className="text-xs text-red-300">{errors.password.message}</span> : null}
            </label>
            {error ? <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</div> : null}
            <Button className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-center text-sm text-slate-400">
              New here? <Link to="/register" className="text-pink-300">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterForm) => {
    try {
      setError(null);
      await registerUser(values.name, values.email, values.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account.');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.2),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_55%,_#1f2937)] p-4 text-slate-100 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30 md:p-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">Create account</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Join the style studio</h1>
          </div>
          <Link to="/" className="text-sm text-slate-400 hover:text-white">Back home</Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">Start building a wardrobe you love</h2>
            <p className="mt-3 text-sm text-slate-400">Create your account and start saving outfits, receiving recommendations, and exploring your AI stylist.</p>
          </div>
          <form className="space-y-4 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6" onSubmit={handleSubmit(onSubmit)}>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              <span>Full name</span>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2">
                <UserCircle2 className="h-4 w-4 text-slate-400" />
                <Input className="border-none bg-transparent px-0 text-white outline-none" placeholder="Ava Chen" {...register('name')} />
              </div>
              {errors.name ? <span className="text-xs text-red-300">{errors.name.message}</span> : null}
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              <span>Email</span>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <Input className="border-none bg-transparent px-0 text-white outline-none" placeholder="you@example.com" {...register('email')} />
              </div>
              {errors.email ? <span className="text-xs text-red-300">{errors.email.message}</span> : null}
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              <span>Password</span>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2">
                <Lock className="h-4 w-4 text-slate-400" />
                <Input type="password" className="border-none bg-transparent px-0 text-white outline-none" placeholder="••••••••" {...register('password')} />
              </div>
              {errors.password ? <span className="text-xs text-red-300">{errors.password.message}</span> : null}
            </label>
            {error ? <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</div> : null}
            <Button className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account…' : 'Create account'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-center text-sm text-slate-400">
              Already have an account? <Link to="/login" className="text-pink-300">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
