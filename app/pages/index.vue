<script setup lang="ts">
import { ref, computed, watch } from 'vue'

type Character = {
  id: number
  name: string
  image: string
}

type Info = {
  pages: number
}

type CharactersResponse = {
  info: Info
  results: Character[]
}
const page = ref(1)
const search = ref('')

const debouncedSearch = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(search, (searchValue) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedSearch.value = searchValue.trim()
    page.value = 1
  }, 400)
})

const { data, pending, error, refresh } = await useFetch<CharactersResponse>(
  'https://rickandmortyapi.com/api/character',
  {
    query: computed(() => ({
      page: page.value,
      name: debouncedSearch.value || undefined
    }))
  }
)

watch([page, debouncedSearch], () => refresh())

const characters = computed(() => data.value?.results ?? [])
const pagesCount = computed(() => data.value?.info?.pages ?? 1)

function next() {
  if (page.value < pagesCount.value) page.value++
}
function prev() {
  if (page.value > 1) page.value--
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1 p-4 md:p-8">
      <header class="max-w-5xl mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 class="text-2xl font-bold">Rick & Morty Characters</h1>
      
        <input
          v-model="search"
          type="text"
          placeholder="Search by name..."
          class="w-full md:w-80 rounded-xl border px-4 py-2"
        />
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

    <footer class="border-t py-4 text-center text-sm text-gray-500 flex items-center justify-center gap-3 mt-8">
        <button
          class="px-4 py-2 rounded-xl border disabled:opacity-40"
          :disabled="page === 1"
          @click="prev"
        >
          Prev
        </button>

        <span class="text-sm">Page {{ page }} / {{ pagesCount }}</span>

        <button
          class="px-4 py-2 rounded-xl border disabled:opacity-40"
          :disabled="page === pagesCount"
          @click="next"
        >
          Next
        </button>
    </footer>
  </div>
</template>
