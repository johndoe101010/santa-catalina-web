import { waUrl } from "@/lib/site";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function StickyWhatsApp() {
  return (
    <motion.a
      href={waUrl()}
      target="_blank"
      rel="noopener"
      initial={{ opacity: 0, scale: 0.6, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed bottom-5 right-5 z-50 group"
      aria-label="Chatear por WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-20" />
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-strong transition-transform group-hover:scale-110">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
    </motion.a>
  );
}
