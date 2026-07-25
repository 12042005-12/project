import { useState } from 'react';
import { ImageUp, Sparkles } from 'lucide-react';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import { Footer } from '../components/footer';
import { uploadClothing } from '../services/api-service';
import { useToast } from '../contexts/toast-context';

export function UploadPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { pushToast } = useToast();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setIsUploading(true);
    try {
      await uploadClothing(formData);
      pushToast({ title: 'Clothing uploaded', description: 'Your wardrobe item is now available.' });
    } catch (error) {
      pushToast({ title: 'Upload failed', description: error instanceof Error ? error.message : 'Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.2),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_55%,_#1f2937)] text-slate-100">
      <Navbar onToggleSidebar={() => setSidebarOpen((open) => !open)} />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">Upload clothing</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">Add new pieces to your wardrobe.</h1>
                <p className="mt-2 text-sm text-slate-400">Upload images to build a richer wardrobe catalog and power better outfit recommendations.</p>
              </div>
            </div>
          </section>
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
            <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-500/10 text-pink-300">
                <ImageUp className="h-8 w-8" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">Drag and drop your images</h2>
              <p className="mt-2 text-sm text-slate-400">Your photos will be processed for wardrobe tagging and style matching.</p>
              <label className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-medium text-white">
                {isUploading ? 'Uploading...' : 'Select files'}
                <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
              </label>
            </div>
            <div className="mt-6 flex items-center gap-2 rounded-2xl border border-pink-400/20 bg-pink-500/10 p-3 text-sm text-pink-200">
              <Sparkles className="h-4 w-4" />
              AI-powered tagging is ready for your next upload.
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
