export default function HomePage() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-[#0b0d12] p-6 text-center">
      <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-md">
        <span className="inline-block rounded-full bg-emerald-500/15 px-3 py-1 font-mono text-xs text-emerald-400">
          PHASE 1 READY • NEXT.JS 16 + TAILWIND V4 + R3F
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
          DeskCraft 3D
        </h1>
        <p className="mt-2 max-w-md text-sm text-zinc-400">
          Interactive Cozy Workspace Configurator foundation initialized.
        </p>
      </div>
    </main>
  );
}