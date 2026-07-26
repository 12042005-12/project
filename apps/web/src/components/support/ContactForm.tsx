import { useState } from "react";
import { useCreateSupportTicket } from "../../services/api-service";

const categories = [
  "General",
  "Technical",
  "Account",
  "Billing",
  "Bug Report",
  "Feature Request",
];

export default function ContactForm() {
  const { mutateAsync, isPending } = useCreateSupportTicket();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await mutateAsync(form);

      alert("Support ticket submitted successfully!");

      setForm({
        name: "",
        email: "",
        subject: "",
        category: "General",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit ticket.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Contact Support
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            Name
          </label>

          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Subject
          </label>

          <input
            required
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            {categories.map((item) => (
              <option key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Message
          </label>

          <textarea
            required
            rows={6}
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          disabled={isPending}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 font-semibold"
        >
          {isPending ? "Submitting..." : "Submit Ticket"}
        </button>

      </form>
    </div>
  );
}