import { useMemo, useState } from "react";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@email.com", role: "Student", status: "Active" },
  { id: 2, name: "Sofia Khan", email: "sofia@email.com", role: "Instructor", status: "Inactive" },
];

export const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(
    () => users.filter((user) => [user.name, user.email, user.role].join(" ").toLowerCase().includes(query.toLowerCase())),
    [users, query],
  );

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user,
      ),
    );
  };

  return (
    <section className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">Users</h2>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search users"
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-[#FF3B30]/60 md:w-72"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm text-zinc-300">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Toggle</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-white/5">
                <td className="px-3 py-3 text-white">{user.name}</td>
                <td className="px-3 py-3">{user.email}</td>
                <td className="px-3 py-3">{user.role}</td>
                <td className="px-3 py-3">{user.status}</td>
                <td className="px-3 py-3">
                  <button onClick={() => toggleStatus(user.id)} className="rounded-lg border border-white/10 px-3 py-1 hover:border-[#FF3B30]/50">
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
