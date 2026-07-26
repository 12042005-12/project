import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I upload clothes?",
    answer:
      "Go to the Wardrobe page, click 'Upload Clothing', choose an image, enter clothing details, and save it to your wardrobe.",
  },
  {
    question: "How does AI recommend outfits?",
    answer:
      "Our AI analyzes your wardrobe, occasion, weather, color preferences, and style to generate personalized outfit recommendations.",
  },
  {
    question: "How do I use Virtual Try-On?",
    answer:
      "Upload your photo and select a clothing item from your wardrobe. The AI generates a virtual try-on preview.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Go to the Login page and click 'Forgot Password'. Follow the OTP verification process to create a new password.",
  },
  {
    question: "Can I save my favorite outfits?",
    answer:
      "Yes. Click the Save icon on any recommended outfit to add it to your Saved Outfits collection.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes. All user information is securely stored and protected using authentication and encrypted communication.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "Use the Contact Form below or click the Live Chat button to speak with our AI assistant.",
  },
  {
    question: "Can I delete my account?",
    answer:
      "Yes. Go to Settings → Account → Delete Account. This permanently removes your profile and wardrobe data.",
  },
];

export default function FAQAccordion() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const open = active === index;

        return (
          <motion.div
            key={index}
            layout
            className="bg-white dark:bg-slate-900 rounded-xl shadow-md overflow-hidden"
          >
            <button
              onClick={() => setActive(open ? null : index)}
              className="w-full flex justify-between items-center p-5 text-left"
            >
              <span className="font-semibold text-lg">
                {faq.question}
              </span>

              {open ? (
                <ChevronUp className="text-purple-600" />
              ) : (
                <ChevronDown className="text-purple-600" />
              )}
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-5 pb-5 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}