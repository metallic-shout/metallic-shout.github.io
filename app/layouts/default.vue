<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div class="text-lg font-semibold tracking-tight">Project</div>
        <nav class="flex items-center gap-6 text-sm text-slate-600">
          <a class="transition hover:text-slate-900" href="#">Home</a>
          <a class="transition hover:text-slate-900" href="#">Features</a>
          <a class="transition hover:text-slate-900" href="#">Contact</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl px-6 py-10">
      <slot />
    </main>

    <footer class="border-t border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <span>© 2026 Project</span>
        <span>Built with Nuxt 4 + Tailwind CSS</span>
      </div>
    </footer>
  </div>
</template>
