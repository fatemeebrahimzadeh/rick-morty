<template>
  <div class="flex min-h-screen flex-col bg-slate-50 text-slate-900">
    <header class="border-b bg-white/80 backdrop-blur">
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <NuxtLink to="/" class="group flex items-center gap-3 font-semibold tracking-tight">
          <span
            class="rounded-lg bg-slate-900 px-2 py-1 text-xs font-bold uppercase leading-none text-white transition group-hover:-translate-y-0.5"
          >
            R&M
          </span>
          <span class="text-base md:text-lg">Rick &amp; Morty Atlas</span>
        </NuxtLink>

        <nav class="flex items-center gap-3 text-sm font-medium text-slate-600">
          <NuxtLink to="/" class="hover:text-slate-900">Characters</NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <slot name="header-cta" />
        </div>
      </div>

      <div v-if="$slots['header-context']" class="border-t bg-slate-50/80">
        <div class="mx-auto max-w-5xl px-4 py-3 md:px-6">
          <slot name="header-context" />
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t bg-white/80 backdrop-blur">
      <div class="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 text-sm text-slate-600 md:px-6">
        <div class="flex items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <span class="rounded-full bg-slate-900 px-2 py-1 text-xs font-semibold text-white">
              API
            </span>
            <span class="leading-tight">Data from the Rick and Morty API</span>
          </div>
          <div class="hidden text-xs uppercase tracking-wide text-slate-500 sm:block">
            Nuxt 3 • Tailwind
          </div>
        </div>
        <div v-if="$slots['footer-context']" class="pt-1">
          <slot name="footer-context" />
        </div>
      </div>
    </footer>
  </div>
</template>
