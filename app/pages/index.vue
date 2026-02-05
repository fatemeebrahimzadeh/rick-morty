<script setup lang="ts">
const { page, search, characters, pagesCount, pending, error, next, prev } = useCharacters()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <main class="flex-1 p-4 md:p-8">
      <header
        class="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between"
      >
        <h1 class="text-2xl font-bold">Rick & Morty Characters</h1>

        <input
          v-model="search"
          type="text"
          placeholder="Search by name..."
          class="w-full rounded-xl border px-4 py-2 md:w-80"
        />
      </header>

      <section class="mx-auto mt-6 max-w-5xl">
        <div v-if="pending" class="py-10 text-center">Loading...</div>

        <div v-else-if="error" class="py-10 text-center">
          <p class="font-semibold">No results / Error</p>
        </div>

        <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          <NuxtLink
            v-for="character in characters"
            :key="character.id"
            :to="`/character/${character.id}`"
            class="block overflow-hidden rounded-2xl border transition hover:shadow-md"
          >
            <CharacterCard :character="character" />
          </NuxtLink>
        </div>
      </section>
    </main>

    <footer
      class="mt-8 flex items-center justify-center gap-3 border-t py-4 text-center text-sm text-gray-500"
    >
      <Pagination :current-page="page" :total-pages="pagesCount" @prev="prev" @next="next" />
    </footer>
  </div>
</template>
