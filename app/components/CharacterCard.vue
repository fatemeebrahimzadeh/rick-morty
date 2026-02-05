<script setup lang="ts">
import type { CharacterSummary } from '~/types/rick-and-morty'

defineProps<{
  character: CharacterSummary
}>()
</script>

<template>
  <article
    class="w-[328px] md:w-[384px] p-4 flex flex-col overflow-hidden rounded-2xl gap-4 border border-gcharcoal"
  >
    <img
      :src="character.image"
      :alt="character.name"
      class="w-full rounded-lg object-cover"
      loading="lazy"
    />
    <div class="space-y-1 p-3 text-white">
      <p class="line-clamp-1 font-bold">{{ character.name }}</p>
      <p
        v-if="character.status || character.species"
        class="flex items-center gap-2 text-sm"
      >
        <span
          class="inline-block h-2 w-2 rounded-full"
          :class="{
            'bg-red-500': character.status?.toLowerCase() === 'dead',
            'bg-emerald-500': character.status?.toLowerCase() === 'alive',
            'bg-slate-400': character.status?.toLowerCase() !== 'dead' && character.status?.toLowerCase() !== 'alive',
          }"
        />
        <span class="truncate">
          {{ character.status }}<span v-if="character.status && character.species"> - </span
          >{{ character.species }}
        </span>
      </p>
    </div>
  </article>
</template>
