<script setup lang="ts">
import { computed } from 'vue'

type Character = {
  id: number
  name: string
  image: string
}

type CharactersResponse = {
  results: Character[]
}

const { data, pending, error } = await useFetch<CharactersResponse>(
  'https://rickandmortyapi.com/api/character'
)

const characters = computed(() => data.value?.results ?? [])
</script>

<template>
  <main class="min-h-screen p-4 md:p-8">
    <header class="max-w-5xl mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <h1 class="text-2xl font-bold">Rick & Morty Characters</h1>
    </header>

    <section class="max-w-5xl mx-auto mt-6">
      <div v-if="pending" class="py-10 text-center">Loading...</div>

      <div v-else-if="error" class="py-10 text-center">
        <p class="font-semibold">No results / Error</p>
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <NuxtLink
          v-for="character in characters"
          :key="character.id"
          :to="`/character/${character.id}`"
          class="rounded-2xl overflow-hidden border hover:shadow-md transition"
        >
          <img :src="character.image" :alt="character.name" class="w-full h-40 object-cover" />
          <div class="p-3">
            <p class="font-semibold line-clamp-1">{{ character.name }}</p>
          </div>
        </NuxtLink>
      </div>

    </section>
  </main>
</template>
