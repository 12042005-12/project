import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SupportCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  actionText?: string;
  onClick?: () => void;
}

export default function SupportCard({
  title,
  description,
  icon,
  color,
  actionText = "Learn More",
  onClick,
}: SupportCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 border border-gray-100 dark:border-slate-800"
    >
      <div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color}
        flex items-center justify-center text-white mb-6`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-bold mb-2">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {description}
      </p>

      <button
        onClick={onClick}
        className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white py-3 transition"
      >
        {actionText}
      </button>
    </motion.div>
  );
}