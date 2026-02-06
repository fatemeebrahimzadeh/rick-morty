<script setup lang="ts">
import logo from '~/assets/images/logo.svg'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gradient-to-b from-graphite via-obsidian to-graphite text-white">
    <header
      class="sticky top-0 z-40 border-b border-charcoal/70 bg-gradient-to-r from-graphite/95 to-obsidian/95 backdrop-blur md:px-[120px]"
    >
      <div class="flex items-center justify-between px-4 py-3 md:py-4">
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
        <div class="mx-auto px-4 pb-4">
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
