<script setup lang="ts">
type Character = {
  id: number
  name: string
  image: string
  status?: string
  species?: string
}

defineProps<{
  character: Character
}>()
</script>

<template>
  <article class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden h-full">
    <img
      :src="character.image"
      :alt="character.name"
      class="w-full h-40 object-cover"
      loading="lazy"
    />
    <div class="p-3 space-y-1">
      <p class="font-semibold line-clamp-1">{{ character.name }}</p>
      <p v-if="character.status || character.species" class="text-sm text-gray-500 line-clamp-1">
        {{ character.status }}<span v-if="character.status && character.species"> • </span>{{ character.species }}
      </p>
    </div>
  </article>
</template>
