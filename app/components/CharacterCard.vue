<script setup lang="ts">
import type { CharacterSummary } from '~/types/rick-and-morty'

defineProps<{
  character: CharacterSummary
}>()
</script>

<template>
  <article
    class="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
  >
    <img
      :src="character.image"
      :alt="character.name"
      class="h-40 w-full object-cover"
      loading="lazy"
    />
    <div class="space-y-1 p-3">
      <p class="line-clamp-1 font-semibold">{{ character.name }}</p>
      <p v-if="character.status || character.species" class="line-clamp-1 text-sm text-gray-500">
        {{ character.status }}<span v-if="character.status && character.species"> • </span
        >{{ character.species }}
      </p>
    </div>
  </article>
</template>
