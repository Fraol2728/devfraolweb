import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LogOut, Menu, Trash2, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/useToastStore";
import { apiFetch } from "@/lib/api";

const ADMIN_TOKEN_KEY = "devfraol_admin_token";
const tabs = ["Dashboard", "Courses", "Apps", "Resources", "Users"];

const emptyForms = {
  Courses: { title: "", description: "", category: "", thumbnail: "", pricing: "", modules: "" },
  Apps: { title: "", description: "", icon: "", category: "", endpoint: "", featured: false, tool: "converter" },
  Resources: { title: "", description: "", category: "", link: "", icon: "" },
};

export const Admin = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || "");
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await apiFetch("/api/admin/login", { method: "POST", body: JSON.stringify(auth) });
      localStorage.setItem(ADMIN_TOKEN_KEY, response.token);
      setToken(response.token);
      toast({ title: "Welcome admin", description: "Authentication successful.", variant: "success" });
    } catch (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    }
  };

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

  const statCards = useMemo(() => [
    { label: "Courses", value: stats.courses },
    { label: "Apps", value: stats.apps },
    { label: "Resources", value: stats.resources },
    { label: "Users", value: stats.users },
  ], [stats]);

  if (!token) {
    return (
      <main className="mx-auto flex min-h-[80vh] max-w-md items-center px-4">
        <form onSubmit={handleLogin} className="w-full rounded-2xl border border-red-500/35 bg-black/40 p-6 backdrop-blur">
          <h1 className="mb-4 text-2xl font-bold text-white">Admin Login</h1>
          <input className="mb-3 w-full rounded-lg border border-white/15 bg-zinc-900 p-2 text-white" placeholder="Username" value={auth.username} onChange={(e) => setAuth((p) => ({ ...p, username: e.target.value }))} />
          <input className="mb-4 w-full rounded-lg border border-white/15 bg-zinc-900 p-2 text-white" type="password" placeholder="Password" value={auth.password} onChange={(e) => setAuth((p) => ({ ...p, password: e.target.value }))} />
          <button className="w-full rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500">Login</button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <div className="mx-auto flex max-w-7xl gap-4 p-4 md:p-6">
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-black/95 p-5 transition-transform md:static md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="mb-6 flex items-center justify-between"><h2 className="font-bold text-red-400">Admin Menu</h2><button className="md:hidden" onClick={() => setMobileOpen(false)}><X /></button></div>
          <nav className="space-y-2">{tabs.map((tab) => <button key={tab} onClick={() => { setActiveTab(tab); setMobileOpen(false); }} className={`w-full rounded-lg px-3 py-2 text-left ${activeTab === tab ? "bg-red-600" : "bg-zinc-900 hover:bg-zinc-800"}`}>{tab}</button>)}</nav>
          <button onClick={handleLogout} className="mt-8 flex items-center gap-2 text-sm text-red-300"><LogOut size={16}/>Logout</button>
        </aside>

        <section className="w-full md:ml-0">
          <div className="mb-4 flex items-center justify-between"><button className="rounded-lg bg-zinc-800 p-2 md:hidden" onClick={() => setMobileOpen(true)}><Menu /></button><h1 className="text-2xl font-bold text-red-400">{activeTab}</h1></div>

          {activeTab === "Dashboard" && (
            <div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{statCards.map((card) => <motion.div whileHover={{ y: -3 }} key={card.label} className="rounded-2xl border border-red-500/35 bg-zinc-900/70 p-4"><p className="text-sm text-zinc-400">{card.label}</p><p className="text-3xl font-bold">{card.value}</p></motion.div>)}</div>
              <div className="mt-6 rounded-2xl border border-red-500/35 bg-zinc-900/70 p-4"><h3 className="mb-3 text-lg font-semibold">Recent Activity</h3><ul className="space-y-2 text-sm text-zinc-300">{(stats.activity || []).slice(0,8).map((item) => <li key={item.id}>{item.action} • {item.target}</li>)}{stats.activity?.length === 0 && <li>No recent activity yet.</li>}</ul></div>
            </div>
          )}

          {tabs.filter((t) => ["Courses", "Apps", "Resources"].includes(t)).map((tab) => activeTab === tab && (
            <div key={tab} className="space-y-4">
              <div className="rounded-2xl border border-red-500/35 bg-zinc-900/70 p-4">
                <h3 className="mb-3 font-semibold">{editing[tab] ? `Edit ${tab.slice(0, -1)}` : `Add ${tab.slice(0, -1)}`}</h3>
                <div className="grid gap-2 md:grid-cols-2">
                  {Object.keys(emptyForms[tab]).map((field) => (
                    <input key={field} type={field === "featured" ? "checkbox" : "text"} placeholder={field} checked={field === "featured" ? forms[tab][field] : undefined} value={field === "featured" ? undefined : forms[tab][field] ?? ""} onChange={(e) => setForms((p) => ({ ...p, [tab]: { ...p[tab], [field]: field === "featured" ? e.target.checked : e.target.value } }))} className="rounded-lg border border-white/10 bg-black/45 p-2" />
                  ))}
                </div>
                <div className="mt-3 flex gap-2"><button onClick={() => submitEntity(tab)} className="rounded bg-red-600 px-4 py-2 text-sm">{editing[tab] ? "Update" : "Create"}</button>{editing[tab] && <button onClick={() => { setEditing((p) => ({ ...p, [tab]: null })); setForms((p) => ({ ...p, [tab]: emptyForms[tab] })); }} className="rounded bg-zinc-700 px-4 py-2 text-sm">Cancel</button>}</div>
              </div>

              <div className="rounded-2xl border border-red-500/35 bg-zinc-900/70 p-4">
                <h3 className="mb-3 font-semibold">{tab} List</h3>
                <div className="space-y-2">{listData[keyMap[tab]].map((item) => (
                  <motion.div whileHover={{ scale: 1.01 }} key={item.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-3">
                    <div><p className="font-medium">{item.title}</p><p className="text-xs text-zinc-400">{item.category}</p></div>
                    <div className="flex gap-2"><button onClick={() => startEdit(tab, item)} className="rounded bg-zinc-700 px-3 py-1 text-xs">Edit</button><button onClick={() => removeEntity(tab, item.id)} className="rounded bg-red-700 px-2 py-1"><Trash2 size={14}/></button></div>
                  </motion.div>
                ))}</div>
              </div>
            </div>
          ))}

          {activeTab === "Users" && (
            <div className="space-y-2 rounded-2xl border border-red-500/35 bg-zinc-900/70 p-4">
              {listData.users.map((user) => <div key={user.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-3"><div className="flex items-center gap-2"><User size={16} /><div><p>{user.name}</p><p className="text-xs text-zinc-400">{user.email}</p></div></div><p className="text-sm text-red-300">{user.role} • {user.progress}% progress</p></div>)}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
