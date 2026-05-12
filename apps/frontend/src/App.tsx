import { useEffect, useState } from "react";
import "./App.css";
import { createUser, getUsers } from "./api/users";
import type { User } from "./api/users";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      const created = await createUser({ name, email });
      setUsers((prev) => [...prev, created]);
      setName("");
      setEmail("");
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : "Failed to create user");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Users</h1>

      <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2rem" }}>
        <h2>Create User</h2>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {formError && <p style={{ color: "red" }}>{formError}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Creating…" : "Create"}
        </button>
      </form>

      <h2>User List</h2>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && users.length === 0 && <p>No users yet.</p>}
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
