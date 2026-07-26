import { motion } from "framer-motion";
import {
  Users,
  Clock3,
  Star,
  MessageCircle,
} from "lucide-react";

const stats = [
  {
    number: "50K+",
    label: "Happy Users",
    icon: Users,
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "24/7",
    label: "Support Available",
    icon: Clock3,
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "98%",
    label: "Customer Satisfaction",
    icon: Star,
    color: "from-yellow-400 to-orange-500",
  },
  {
    number: "<2 hrs",
    label: "Average Response",
    icon: MessageCircle,
    color: "from-green-500 to-emerald-500",
  },
];

export default function SupportStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8 text-center border border-slate-200 dark:border-slate-800"
          >
            <div
              className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${stat.color}
              flex items-center justify-center text-white mb-5`}
            >
              <Icon size={30} />
            </div>

            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              {stat.number}
            </h2>

            <p className="mt-3 text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}