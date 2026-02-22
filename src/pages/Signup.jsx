import { useState } from "react";
import { motion } from "framer-motion";
import { Chrome, Github, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/useToastStore";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    if (!emailRegex.test(form.email.trim())) nextErrors.email = "Please enter a valid email address.";
    if (form.password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = "Passwords do not match.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      toast({ title: "Validation error", description: "Please fix highlighted fields.", variant: "destructive" });
      return;
    }

    toast({ title: "Signup ready", description: "Account creation request can now be wired to backend.", variant: "success" });
  };

  const redirectOAuth = (provider) => {
    toast({ title: `Redirecting to ${provider} login…`, description: "OAuth handoff placeholder route.", variant: "success" });
    navigate(`/auth/${provider.toLowerCase()}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#120506] to-[#25080b] px-4 py-10 text-white">
      <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-3">
        <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-1">
          <h1 className="text-2xl font-bold">Join Dev Fraol Academy</h1>
          <p className="mt-2 text-sm text-white/70">Create your account and unlock project-driven lessons.</p>
          <div className="mt-6 space-y-3">
            <OAuthButton label="Continue with Google" icon={Chrome} onClick={() => redirectOAuth("Google")} />
            <OAuthButton label="Continue with GitHub" icon={Github} onClick={() => redirectOAuth("GitHub")} />
          </div>
        </motion.article>

        <motion.form onSubmit={onSubmit} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-3xl border border-red-500/35 bg-black/45 p-6 shadow-[0_0_80px_rgba(255,59,48,0.15)] backdrop-blur-xl lg:col-span-2">
          <h2 className="text-2xl font-semibold">Sign Up</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Email" name="email" type="email" value={form.email} error={errors.email} onChange={(value) => setForm((prev) => ({ ...prev, email: value }))} />
            <Field label="Password" name="password" type="password" value={form.password} error={errors.password} onChange={(value) => setForm((prev) => ({ ...prev, password: value }))} />
            <div className="md:col-span-2">
              <Field label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} error={errors.confirmPassword} onChange={(value) => setForm((prev) => ({ ...prev, confirmPassword: value }))} />
            </div>
          </div>
          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff3b30] to-[#b21310] px-4 py-2.5 font-semibold transition hover:scale-[1.01] hover:shadow-[0_0_24px_rgba(255,59,48,0.4)]"><UserPlus size={18} />Create account</button>
          <p className="mt-4 text-sm text-white/75">Already have an account? <Link to="/login" className="text-[#ff5b54] hover:underline">Login</Link></p>
        </motion.form>
      </section>
    </main>
  );
};

const OAuthButton = ({ label, icon: Icon, onClick }) => (
  <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClick} className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-medium text-white transition hover:border-red-400/50 hover:shadow-[0_0_20px_rgba(255,59,48,0.25)]">
    <Icon size={16} />
    {label}
  </motion.button>
);

const Field = ({ label, name, type, value, error, onChange }) => (
  <label className="block text-sm">
    <span className="mb-1 block text-white/80">{label}</span>
    <input name={name} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-white outline-none transition focus:border-red-500/60" />
    {error ? <span className="mt-1 block text-xs text-red-300">{error}</span> : null}
  </label>
);
