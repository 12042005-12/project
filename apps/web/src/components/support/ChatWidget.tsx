import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const quickReplies = [
  "Recommend an outfit",
  "Reset my password",
  "Virtual Try-On help",
  "Upload clothes",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        "👋 Hi! I'm your AI Fashion Assistant. How can I help you today?",
    },
  ]);

  const getBotReply = (message: string) => {
    const msg = message.toLowerCase();

    if (msg.includes("password"))
      return "Go to Login → Forgot Password → Verify OTP.";

    if (msg.includes("recommend"))
      return "Visit the Recommendations page to generate AI outfit suggestions.";

    if (msg.includes("upload"))
      return "Open the Wardrobe page and click Upload Clothing.";

    if (msg.includes("try"))
      return "Go to Virtual Try-On, upload your image, and choose a clothing item.";

    return "Thank you! Our support team will get back to you soon.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user" as const,
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: getBotReply(input),
        },
      ]);
    }, 700);

    setInput("");
  };

  const quickReply = (text: string) => {
    setInput(text);

    setTimeout(() => {
      const userMessage = {
        sender: "user" as const,
        text,
      };

      setMessages((prev) => [...prev, userMessage]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: getBotReply(text),
          },
        ]);
      }, 600);

      setInput("");
    }, 100);
  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl flex items-center justify-center"
      >
        {open ? <X size={30} /> : <MessageCircle size={30} />}
      </button>

      {/* Chat Window */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 50,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 50,
            }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-5">

              <h2 className="text-xl font-bold">
                AI Fashion Assistant
              </h2>

              <p className="text-sm text-purple-100">
                Online • Ready to help
              </p>

            </div>

            {/* Messages */}

            <div className="h-[380px] overflow-y-auto p-4 space-y-4">

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 flex gap-2 ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-slate-200 dark:bg-slate-800"
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      <Bot size={18} />
                    ) : (
                      <User size={18} />
                    )}

                    <span>{msg.text}</span>
                  </div>
                </div>
              ))}

            </div>

            {/* Quick Replies */}

            <div className="px-4 flex flex-wrap gap-2">

              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => quickReply(reply)}
                  className="text-sm bg-purple-100 dark:bg-slate-800 rounded-full px-3 py-1"
                >
                  {reply}
                </button>
              ))}

            </div>

            {/* Input */}

            <div className="p-4 border-t flex gap-2">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 border rounded-xl px-4 py-3 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />

              <button
                onClick={sendMessage}
                className="bg-purple-600 text-white rounded-xl px-5"
              >
                <Send size={18} />
              </button>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}