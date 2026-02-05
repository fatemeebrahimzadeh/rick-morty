<script setup lang="ts">
const { page, search, characters, pagesCount, pending, error, next, prev, searchNow } = useCharacters()
</script>

<template>
  <NuxtLayout>
    <template #header-context>
      <div class="mx-auto h-20 md:max-w-[1608px] p-4 rounded-lg flex gap-4 bg-graphite">
        <input
          v-model="search"
          type="text"
          placeholder="Search for characters..."
          class="w-full h-12 rounded-lg px-4 text-white outline-none transition bg-steel"
        />
        <button
          type="button"
          class="flex h-12 w-12 md:w-auto py-3 px-4 items-center justify-center rounded bg-lime-apple transition hover:-translate-y-0.5 gap-2"
          aria-label="Search characters"
          @click="searchNow"
        >
          <IconsSearch class="h-5 w-5" />
          <span class="hidden text-sm font-semibold text-obsidian md:inline-block">Search</span>
        </button>
      </div>
    </template>

    <section class="mx-auto py-8 md:px-[120px] md:py-16 md:p-8">
      <div v-if="pending" class="py-10 text-center">Loading...</div>

      <div v-else-if="error" class="py-10 text-center">
        <p class="font-semibold">No results / Error</p>
      </div>

      <div v-else class="flex flex-col items-center justify-center md:flex-row md:flex-wrap gap-6">
        <NuxtLink
          v-for="character in characters"
          :key="character.id"
          :to="`/character/${character.id}`"
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
