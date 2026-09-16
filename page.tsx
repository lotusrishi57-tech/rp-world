 "use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateCharacter() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "", avatar: "", role: "", personality: "", first: "",
    language: "Tanglish"
  });

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  function save() {
    if (!form.name.trim()) return;
    localStorage.setItem("rp-world-character", JSON.stringify(form));
    setSaved(true);
  }

  return (
    <main className="min-h-screen bg-[#09090b]">
      <nav className="border-b border-zinc-800 px-5 py-5">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="font-black text-xl">RP <span className="text-violet-400">World</span></Link>
          <Link href="/chat" className="text-sm text-zinc-400 hover:text-white">Open chat →</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-5 py-10">
        <h1 className="text-4xl font-black">Create Character</h1>
        <p className="mt-2 text-zinc-400">Give your character a personality and let the story begin.</p>

        <div className="mt-8 space-y-5 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
          {[
            ["name", "Name", "e.g. Keerthana"],
            ["avatar", "Avatar Image URL", "https://..."],
            ["role", "Role / Tagline", "e.g. Warm-hearted neighbor"],
          ].map(([key, label, placeholder]) => (
            <label key={key} className="block">
              <span className="mb-2 block text-sm font-semibold text-zinc-300">{label}</span>
              <input value={form[key as keyof typeof form]} onChange={e => update(key, e.target.value)}
                placeholder={placeholder} className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-violet-500" />
            </label>
          ))}

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-zinc-300">Backstory / Personality</span>
            <textarea rows={6} value={form.personality} onChange={e => update("personality", e.target.value)}
              placeholder="Describe personality, history, relationships, habits, boundaries, speaking style..."
              className="w-full resize-y rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-violet-500" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-zinc-300">First Message</span>
            <textarea rows={4} value={form.first} onChange={e => update("first", e.target.value)}
              placeholder="*smiles and looks at you* Hey... how are you?"
              className="w-full resize-y rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-violet-500" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-zinc-300">Preferred Language</span>
            <select value={form.language} onChange={e => update("language", e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-violet-500">
              <option>Tanglish</option><option>English</option><option>Tamil</option>
            </select>
          </label>

          <button onClick={save} className="w-full rounded-xl bg-violet-500 px-5 py-3 font-bold hover:bg-violet-400">
            {saved ? "✓ Character Saved" : "Save Character"}
          </button>
        </div>
      </section>
    </main>
  );
}
