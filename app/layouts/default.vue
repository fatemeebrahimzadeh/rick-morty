<script setup lang="ts">
import logo from '~/assets/images/logo.svg'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-graphite">
    <header
      class="sticky top-0 z-40 bg-gradient-to-r from-graphite/95 to-obsidian/95 md:px-[120px]"
    >
      <div class="flex items-center justify-between px-4 py-3">
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
        <div class="mx-auto px-4 py-3">
          <slot name="header-context" />
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer>
      <div class="mx-auto">
        <div v-if="$slots['footer-context']">
          <slot name="footer-context" />
        </div>
      </div>
    </footer>
  </div>
</template>
