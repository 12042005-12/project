import { Camera, MessageCircleMore, Shirt, Sparkles } from 'lucide-react';

const items = [
  {
    title: 'Wardrobe management',
    description: 'Organize outfits you already own and spot gaps before you shop.',
    icon: Shirt,
  },
  {
    title: 'AI recommendations',
    description: 'Get personalized outfit ideas for events, weather, and preferences.',
    icon: Sparkles,
  },
  {
    title: 'Virtual try-on',
    description: 'Preview your next outfit in a realistic AI-assisted experience.',
    icon: Camera,
  },
  {
    title: 'Stylist chat',
    description: 'Ask for guidance, refine your look, and keep the conversation flowing.',
    icon: MessageCircleMore,
  },
];

export function FeatureCards() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map(({ title, description, icon: Icon }) => (
        <div key={title} className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-5">
          <div className="rounded-2xl bg-pink-500/10 p-3 text-pink-300">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        </div>
      ))}
    </section>
  );
}
