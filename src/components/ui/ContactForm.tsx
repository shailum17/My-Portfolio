import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <motion.form
      className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      onSubmit={e => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <h2 className="text-2xl font-bold mb-6 text-primary">Contact Me</h2>
      <div className="relative mb-4">
        <input className="peer w-full p-3 border-b-2 border-gray-200 focus:border-primary outline-none bg-transparent" placeholder=" " required />
        <label className="absolute left-3 top-3 text-gray-400 peer-focus:text-primary transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-xs">Your Name</label>
      </div>
      <div className="relative mb-4">
        <input className="peer w-full p-3 border-b-2 border-gray-200 focus:border-primary outline-none bg-transparent" placeholder=" " required type="email" />
        <label className="absolute left-3 top-3 text-gray-400 peer-focus:text-primary transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-xs">Your Email</label>
      </div>
      <div className="relative mb-6">
        <textarea className="peer w-full p-3 border-b-2 border-gray-200 focus:border-primary outline-none bg-transparent resize-none" placeholder=" " required rows={4} />
        <label className="absolute left-3 top-3 text-gray-400 peer-focus:text-primary transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-xs">Your Message</label>
      </div>
      <motion.button
        type="submit"
        className="btn-primary w-full py-3 text-lg"
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.03 }}
      >
        {sent ? "Sent!" : "Send"}
      </motion.button>
    </motion.form>
  );
}
