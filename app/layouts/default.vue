<script setup lang="ts">
import logo from '~/assets/images/logo.svg'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-graphite">
    <header
      class="sticky top-0 z-40 bg-gradient-to-r from-graphite/95 to-obsidian/95 md:px-[120px]"
    >
      <div
        class="flex items-center justify-between py-3 px-4"
      >
        <NuxtLink to="/" class="group">
          <img
            :src="logo"
            alt="Rick & Morty Atlas"
            class="h-9 w-auto transition group-hover:-translate-y-0.5"
          />
          <span class="sr-only">Rick & Morty Atlas</span>
        </NuxtLink>
      </div>

      <div v-if="$slots['header-context']">
        <div class="mx-auto py-3 px-4">
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
