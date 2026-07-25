import { Bell, Moon, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { Button } from '@ui/index';
import { AppShell } from '../components/app-shell';
import { Panel } from '../components/content';

export function SettingsPage() {
  return (
    <AppShell title="Settings" description="Manage how your styling assistant behaves and how you receive updates.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Preferences" description="Adjust the experience to fit your routine.">
          <div className="space-y-3">
            {[
              { label: 'Enable smart recommendations', value: 'On' },
              { label: 'Dark mode', value: 'On' },
              { label: 'Use location for weather-aware picks', value: 'On' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-medium text-white">{item.label}</p>
                  <p className="text-sm text-slate-400">Tailored to your browsing habits</p>
                </div>
                <p className="text-sm text-pink-200">{item.value}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Account controls" description="Keep your data safe and your notifications useful.">
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Bell className="h-5 w-5 text-pink-300" />
              <div>
                <p className="font-medium text-white">Weekly style summary</p>
                <p className="text-sm text-slate-400">Receive a recap of your outfit suggestions.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Moon className="h-5 w-5 text-pink-300" />
              <div>
                <p className="font-medium text-white">Theme preference</p>
                <p className="text-sm text-slate-400">Use the darker studio theme by default.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <ShieldCheck className="h-5 w-5 text-pink-300" />
              <div>
                <p className="font-medium text-white">Privacy controls</p>
                <p className="text-sm text-slate-400">Keep your wardrobe data private and secure.</p>
              </div>
            </div>
            <Button variant="outline" className="w-full border-white/20 bg-transparent text-slate-200">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Fine-tune alerts
            </Button>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
