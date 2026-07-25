import { ArrowRight, KeyRound } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@ui/index';
import { AppShell } from '../components/app-shell';
import { verifyOtp } from '../services/auth-service';
import { useToast } from '../contexts/toast-context';

export function OtpVerificationPage() {
  const [otp, setOtp] = useState('');
  const { pushToast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await verifyOtp('demo@example.com', otp);
    pushToast({ title: 'Code verified', description: 'You can continue with your reset or sign-in flow.' });
  };

  return (
    <AppShell title="Verify your code" description="Enter the one-time verification code to continue securely." showSidebar={false}>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          <span>OTP code</span>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2">
            <KeyRound className="h-4 w-4 text-slate-400" />
            <Input value={otp} onChange={(event) => setOtp(event.target.value)} className="border-none bg-transparent px-0 text-white outline-none" placeholder="123456" />
          </div>
        </label>
        <Button type="submit" className="bg-gradient-to-r from-pink-500 to-violet-500 text-white">
          Verify <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Link to="/login" className="text-sm text-pink-300">
          Return to sign in
        </Link>
      </form>
    </AppShell>
  );
}
