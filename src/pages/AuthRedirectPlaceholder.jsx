import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { toast } from "@/hooks/useToastStore";

const AuthRedirectPlaceholder = () => {
  const location = useLocation();
  const provider = location.pathname.includes("google") ? "Google" : "GitHub";

  useEffect(() => {
    toast({ title: `Redirecting to ${provider} login…`, description: "Placeholder OAuth route ready for backend integration.", variant: "success" });
  }, [provider]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-[#120506] to-[#25080b] px-4 text-white">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl rounded-3xl border border-white/10 bg-black/50 p-8 text-center backdrop-blur-xl">
        <h1 className="text-3xl font-bold">{provider} OAuth</h1>
        <p className="mt-3 text-white/75">This is a frontend placeholder route (<code className="text-[#ff6a61]">{location.pathname}</code>) and can now be connected to backend auth endpoints.</p>
      </motion.section>
    </main>
  );
};

export default AuthRedirectPlaceholder;
