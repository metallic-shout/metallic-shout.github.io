<template>
  <div class="min-h-screen min-w-full flex-col bg-background text-foreground">
    <header class="border-b">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div class="text-lg font-semibold tracking-tight">Project</div>
        <nav class="flex items-center gap-6 text-sm">
          <a class="transition" href="#">Home</a>
          <a class="transition" href="#">Features</a>
          <a class="transition" href="#">Contact</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <slot />
    </main>

    <footer class="border-t">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between"
      >
        <span>© 2026 Project</span>
        <span>Built with Nuxt 4 + Tailwind CSS</span>
      </div>
    </footer>
  </div>
</template>
