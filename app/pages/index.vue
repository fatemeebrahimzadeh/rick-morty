<script setup lang="ts">
const { page, search, characters, pagesCount, pending, error, next, prev } = useCharacters()
</script>

<template>
  <NuxtLayout>
    <template #header-context>
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Directory</p>
          <h1 class="text-2xl font-bold">Rick &amp; Morty Characters</h1>
        </div>
        <input
          v-model="search"
          type="text"
          placeholder="Search by name..."
          class="w-full rounded-xl border border-slate-200 px-4 py-2 shadow-sm transition focus:border-slate-400 focus:outline-none md:w-80"
        />
      </div>
    </template>

    <section class="mx-auto max-w-5xl p-4 md:p-8">
      <div v-if="pending" class="py-10 text-center">Loading...</div>

      <div v-else-if="error" class="py-10 text-center">
        <p class="font-semibold">No results / Error</p>
      </div>

      <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <NuxtLink
          v-for="character in characters"
          :key="character.id"
          :to="`/character/${character.id}`"
          class="block overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-md"
        >
          <CharacterCard :character="character" />
        </NuxtLink>
      </div>
    </section>

    <template #footer-context>
      <div class="flex items-center justify-center">
        <Pagination :current-page="page" :total-pages="pagesCount" @prev="prev" @next="next" />
      </div>
    </template>
  </NuxtLayout>
</template>
