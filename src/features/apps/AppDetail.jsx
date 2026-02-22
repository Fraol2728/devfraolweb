import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { appsCatalog } from "@/data/apps";

export const AppDetail = () => {
  const { appId } = useParams();
  const app = appsCatalog.find((item) => item.id === appId);

  if (!app) {
    return (
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-xl">
          <h1 className="text-3xl font-bold">App not found</h1>
          <Link to="/apps" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#FF3B30]">
            <ArrowLeft className="h-4 w-4" /> Back to Apps
          </Link>
        </div>
      </section>
    );
  }

  const Icon = app.icon;

  return (
    <section className="px-4 py-16 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-2xl">
        <Link to="/apps" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF3B30] hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Apps
        </Link>
        <div className="mt-6 inline-flex rounded-2xl bg-[#FF3B30]/20 p-4 text-[#FF3B30]">
          <Icon className="h-8 w-8" />
        </div>
        <h1 className="mt-5 text-4xl font-extrabold">{app.name}</h1>
        <p className="mt-4 text-lg text-foreground/75">{app.description}</p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-5">
          <h2 className="text-xl font-bold">How this app works</h2>
          <p className="mt-3 text-foreground/75">Paste your source, choose options, and process your request. The UI is modular and ready for backend API connection for production behavior.</p>
        </div>
        <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#FF3B30] px-5 py-3 font-semibold text-white transition hover:shadow-[0_12px_30px_rgba(255,59,48,0.35)]">
          Launch App
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </motion.div>
    </section>
  );
};
