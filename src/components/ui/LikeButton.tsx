import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.2 }}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow border border-gray-200 transition"
      onClick={() => setLiked(l => !l)}
      aria-pressed={liked}
    >
      <motion.span
        animate={{ scale: liked ? 1.3 : 1, color: liked ? "#e11d48" : "#64748b" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Heart fill={liked ? "#e11d48" : "none"} className="w-5 h-5" />
      </motion.span>
      <span className="font-medium">{liked ? "Liked" : "Like"}</span>
    </motion.button>
  );
} 