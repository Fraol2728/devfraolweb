import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/useToastStore";
import { apiFetch } from "@/lib/api";
import { AdminDashboard } from "@/pages/AdminDashboard";

const ADMIN_TOKEN_KEY = "devfraol_admin_token";

const emptyForms = {
  Courses: { title: "", description: "", category: "", thumbnail: "", pricing: "", modules: "" },
  Apps: { title: "", description: "", icon: "", category: "", endpoint: "", featured: false, tool: "converter" },
  Resources: { title: "", description: "", category: "", link: "", icon: "" },
};

export const Admin = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || "");
  const [stats, setStats] = useState({ courses: 0, apps: 0, resources: 0, users: 0, activity: [] });
  const [listData, setListData] = useState({ courses: [], apps: [], resources: [], users: [] });
  const [forms, setForms] = useState(emptyForms);
  const [editing, setEditing] = useState({ Courses: null, Apps: null, Resources: null });

  const loadData = async () => {
    if (!token) return;

    const [statsRes, coursesRes, appsRes, resourcesRes, usersRes] = await Promise.all([
      apiFetch("/api/admin/stats", { token }),
      apiFetch("/api/admin/courses", { token }),
      apiFetch("/api/admin/apps", { token }),
      apiFetch("/api/admin/resources", { token }),
      apiFetch("/api/admin/users", { token }),
    ]);

    setStats(statsRes.data);
    setListData({
      courses: coursesRes.data ?? [],
      apps: appsRes.data ?? [],
      resources: resourcesRes.data ?? [],
      users: usersRes.data ?? [],
    });
  };

  useEffect(() => {
    loadData().catch((error) => toast({ title: "Load failed", description: error.message, variant: "destructive" }));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken("");
    navigate("/");
  };

  const keyMap = { Courses: "courses", Apps: "apps", Resources: "resources" };

  const submitEntity = async (tab) => {
    const form = forms[tab];
    if (!form.title || !form.description || !form.category) {
      toast({ title: "Validation", description: "Title, description and category are required.", variant: "destructive" });
      return;
    }

    const key = keyMap[tab];
    const currentEdit = editing[tab];
    const payload = {
      ...form,
      modules: tab === "Courses" ? form.modules.split(",").map((m) => m.trim()).filter(Boolean) : undefined,
    };

    try {
      if (currentEdit) {
        await apiFetch(`/api/admin/${key}/${currentEdit.id}`, { method: "PUT", token, body: JSON.stringify(payload) });
      } else {
        await apiFetch(`/api/admin/${key}`, { method: "POST", token, body: JSON.stringify(payload) });
      }

      setForms((prev) => ({ ...prev, [tab]: emptyForms[tab] }));
      setEditing((prev) => ({ ...prev, [tab]: null }));
      await loadData();
      toast({ title: `${tab.slice(0, -1)} saved`, description: "Changes synced to frontend data.", variant: "success" });
    } catch (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    }
  };

  const startEdit = (tab, item) => {
    setEditing((prev) => ({ ...prev, [tab]: item }));
    setForms((prev) => ({
      ...prev,
      [tab]: {
        ...item,
        modules: Array.isArray(item.modules) ? item.modules.join(", ") : "",
      },
    }));
  };

  const removeEntity = async (tab, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await apiFetch(`/api/admin/${keyMap[tab]}/${id}`, { method: "DELETE", token });
      await loadData();
      toast({ title: `${tab.slice(0, -1)} deleted`, description: "Item removed.", variant: "success" });
    } catch (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    }
  };

  if (!token) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-black via-[#120506] to-[#25080b] px-4 text-white">
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl rounded-3xl border border-red-500/35 bg-black/50 p-8 text-center backdrop-blur-xl">
          <h1 className="text-4xl font-bold text-red-400">Dashboard</h1>
          <p className="mt-3 text-sm text-white/75">Admin login fields are temporarily hidden while auth flows are being polished. Existing token-based admin features remain available behind the scenes.</p>
        </motion.section>
      </main>
    );
  }

  return (
    <AdminDashboard
      stats={stats}
      listData={listData}
      forms={forms}
      editing={editing}
      emptyForms={emptyForms}
      setForms={setForms}
      setEditing={setEditing}
      submitEntity={submitEntity}
      removeEntity={removeEntity}
      startEdit={startEdit}
      handleLogout={handleLogout}
    />
  );
};
