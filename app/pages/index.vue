<script setup lang="ts">
const { page, search, characters, pagesCount, pending, error, next, prev, goToPage, searchNow } =
  useCharacters()
</script>

<template>
  <NuxtLayout>
    <template #header-context>
      <div
        class="mx-auto flex h-20 items-center gap-4 rounded-xl bg-obsidian/80 p-4 shadow-lg shadow-black/20 backdrop-blur md:max-w-[1608px]"
      >
        <input
          v-model="search"
          type="text"
          placeholder="Search for characters..."
          class="h-12 w-full rounded-lg bg-steel/80 px-4 text-sm text-white outline-none ring-1 ring-charcoal transition placeholder:text-ash focus:ring-2 focus:ring-lime-apple"
        />
        <button
          type="button"
          class="flex h-12 w-12 items-center justify-center gap-2 rounded-lg bg-lime-apple px-4 py-3 text-obsidian transition hover:-translate-y-0.5 md:w-auto"
          aria-label="Search characters"
          @click="searchNow"
        >
          <IconsSearch class="h-5 w-5" />
          <span class="hidden text-sm font-semibold text-obsidian md:inline-block">Search</span>
        </button>
      </div>
    </template>

    <section class="mx-auto py-8 md:p-8 md:px-[120px] md:py-16 md:pb-0">
      <div v-if="pending" class="py-10 text-center text-ash">Loading...</div>

      <div v-else-if="error" class="py-10 text-center text-ash">
        <p class="font-semibold">No results / Error</p>
      </div>

      <div v-else class="flex flex-col items-center justify-center gap-6 md:flex-row md:flex-wrap">
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
      <div class="flex items-center justify-center p-8 pt-0 md:pt-4">
        <Pagination
          :current-page="page"
          :total-pages="pagesCount"
          @first="goToPage(1)"
          @prev="prev"
          @go="goToPage"
          @next="next"
          @last="goToPage(pagesCount)"
        />
      </div>
    </template>
  </NuxtLayout>
</template>
