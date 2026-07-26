import SupportCard from "../components/support/SupportCard";
import SupportStats from "../components/support/SupportStats";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Headphones,
} from "lucide-react";

import ContactForm from "../components/support/ContactForm";
import FAQAccordion from "../components/support/FAQAccordion";
import ChatWidget from "../components/support/ChatWidget";

export default function SupportPage() {
  const cards = [
    {
      title: "Live Chat",
      description: "Chat instantly with our AI Fashion Assistant.",
      icon: <MessageCircle size={34} />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Email",
      description: "support@makeitwearit.ai",
      icon: <Mail size={34} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Phone",
      description: "+91 98765 43210",
      icon: <Phone size={34} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "24/7 Support",
      description: "Always available for your fashion journey.",
      icon: <Headphones size={34} />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* Hero */}

      <section className="bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            className="text-5xl md:text-6xl font-bold"
          >
            Customer Support
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .3 }}
            className="mt-6 text-xl text-purple-100 max-w-3xl mx-auto"
          >
            Need help with your wardrobe, AI recommendations,
            virtual try-on, or account? We're here to help.
          </motion.p>

        </div>

      </section>

      {/* Cards */}

      <section className="max-w-7xl mx-auto px-6 py-16">

       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
  {cards.map((card) => (
    <SupportCard
      key={card.title}
      title={card.title}
      description={card.description}
      icon={card.icon}
      color={card.color}
    />
  ))}
</div>


      </section>

      {/* Support Stats */}

     <section className="max-w-7xl mx-auto px-6 pb-16">
  <SupportStats />
</section>
      {/* Contact */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <ContactForm />

      </section>

      {/* FAQ */}

      <section className="max-w-5xl mx-auto px-6 pb-24">

        <div className="text-center mb-10">

          <h2 className="text-4xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-slate-500">
            Quick answers to common questions.
          </p>

        </div>

        <FAQAccordion />

      </section>

      {/* Footer */}

      <footer className="bg-slate-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between">

          <div>

            <h2 className="font-bold text-xl">
              Make-It-Wear-It AI
            </h2>

            <p className="mt-3 text-slate-400 max-w-md">
              AI-powered personal fashion stylist and
              virtual try-on platform.
            </p>

          </div>

          <div className="space-y-2 mt-8 md:mt-0">

            <div className="flex items-center gap-2">
              <Mail size={18} />
              support@makeitwearit.ai
            </div>

            <div className="flex items-center gap-2">
              <Phone size={18} />
              +91 98765 43210
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              24 Hours Support
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />
              Secure Assistance
            </div>

          </div>

        </div>

      </footer>

      <ChatWidget />

    </div>
  );
}