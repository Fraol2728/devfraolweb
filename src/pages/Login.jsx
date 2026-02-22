import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/useToastStore";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    if (!emailRegex.test(form.email.trim())) nextErrors.email = "Please enter a valid email address.";
    if (!form.password.trim()) nextErrors.password = "Password is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const setMockUser = (provider) => {
    const loginUser = {
      id: crypto.randomUUID(),
      name: form.email.split("@")[0] || "Learner",
      email: form.email.trim().toLowerCase(),
      role: "Student",
      profilePic: "",
      authProvider: provider,
    };

    setUser(loginUser);
    toast({ title: "Logged in", description: `Signed in with ${provider}. API call can replace this flow later.`, variant: "success" });
    navigate("/");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      toast({ title: "Validation error", description: "Please fix highlighted fields.", variant: "destructive" });
      return;
    }
    setMockUser("local");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#120506] to-[#25080b] px-4 py-10 text-white">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-lg rounded-3xl border border-[#FF3B30]/35 bg-black/45 p-6 shadow-[0_0_80px_rgba(255,59,48,0.15)] backdrop-blur-xl sm:p-8">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="mt-2 text-sm text-white/70">Welcome back to Dev Fraol Academy.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Field label="Email" name="email" type="email" value={form.email} error={errors.email} onChange={(value) => setForm((prev) => ({ ...prev, email: value }))} />
          <Field label="Password" name="password" type="password" value={form.password} error={errors.password} onChange={(value) => setForm((prev) => ({ ...prev, password: value }))} />

          <label className="flex items-center gap-2 text-sm text-white/80">
            <input type="checkbox" checked={form.remember} onChange={(event) => setForm((prev) => ({ ...prev, remember: event.target.checked }))} className="h-4 w-4 rounded border-white/20 bg-black/40 accent-[#FF3B30]" />
            Remember me
          </label>

          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff3b30] to-[#b21310] px-4 py-2.5 font-semibold">
            <LogIn size={18} /> Login
          </motion.button>
        </form>

        <GoogleButton onClick={() => setMockUser("google")} />

        <p className="mt-4 text-sm text-white/75">No account yet? <Link to="/signup" className="text-[#ff5b54] hover:underline">Create one</Link></p>
      </motion.section>
    </main>
  );
};

const Field = ({ label, name, type, value, error, onChange }) => (
  <label className="block text-sm">
    <span className="mb-1 block text-white/80">{label}</span>
    <motion.input
      name={name}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      animate={error ? { x: [0, -5, 5, -3, 0] } : { x: 0 }}
      className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-white outline-none transition focus:border-[#FF3B30]/70"
    />
    <AnimatePresence>{error ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-1 block text-xs text-red-300">{error}</motion.span> : null}</AnimatePresence>
  </label>
);

const GoogleButton = ({ onClick }) => (
  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="button" onClick={onClick} className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-medium text-white transition hover:border-[#FF3B30]/45">
    <GoogleLogo /> Continue with Google
  </motion.button>
);

const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.248 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.841 1.154 7.959 3.041l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z"/>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.841 1.154 7.959 3.041l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.303 4.337-17.694 10.691Z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.144 35.091 26.672 36 24 36c-5.227 0-9.627-3.329-11.283-7.946l-6.522 5.025C9.545 39.556 16.227 44 24 44Z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.049 12.049 0 0 1-4.084 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917Z"/>
  </svg>
);
