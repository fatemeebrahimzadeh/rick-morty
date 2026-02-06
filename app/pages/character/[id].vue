<script setup lang="ts">
import { computed } from 'vue'
import type { CharacterDetail, Episode, LocationDetail } from '~/types/rick-and-morty'

const route = useRoute()
const id = route.params.id as string
const config = useRuntimeConfig()

const { data, pending, error } = await useFetch<CharacterDetail>(
  `${config.public.apiBase}/character/${id}`
)

const character = computed(() => data.value)

const episodeIds = computed(
  () => character.value?.episode?.map((url) => url.split('/').pop()!).filter(Boolean) ?? []
)

const episodeKey = computed(() => (episodeIds.value.length ? episodeIds.value.join(',') : ''))

const {
  data: episodesData,
  pending: episodesPending,
  error: episodesError,
} = await useFetch<Episode[] | Episode>(
  () => (episodeKey.value ? `${config.public.apiBase}/episode/${episodeKey.value}` : ''),
  {
    immediate: true,
    transform: (res) => (Array.isArray(res) ? res : res ? [res] : []),
  }
)

const episodes = computed<Episode[]>(() => episodesData.value ?? [])

const {
  data: locationData,
  pending: locationPending,
  error: locationError,
} = await useFetch<LocationDetail | null>(
  () => (character.value?.location?.url ? character.value.location.url : ''),
  { immediate: true }
)

const locations = computed<LocationDetail[]>(() => (locationData.value ? [locationData.value] : []))

function formatDate(dateStr?: string) {
  if (!dateStr) return 'Unknown'
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <NuxtLayout>
    <template #header-context>
      <div class="flex flex-col gap-4 text-white md:flex-row md:items-center md:gap-10">
        <img
          :src="character?.image"
          :alt="character?.name"
          class="h-20 w-20 rounded-xl border border-charcoal bg-charcoal object-cover shadow-lg shadow-black/20 md:h-[200px] md:w-[200px]"
        />
        <div class="flex flex-col gap-1 md:justify-center">
          <h1 class="text-3xl font-bold text-white">{{ character?.name }}</h1>
          <p
            v-if="character?.status || character?.species"
            class="flex items-center gap-2 text-sm text-ash"
          >
            <span
              class="inline-block h-2.5 w-2.5 rounded-full"
              :class="{
                'bg-red-500': character?.status?.toLowerCase() === 'dead',
                'bg-lime-apple': character?.status?.toLowerCase() === 'alive',
                'bg-ash':
                  character?.status?.toLowerCase() !== 'dead' &&
                  character?.status?.toLowerCase() !== 'alive',
              }"
            />
            <span class="truncate">
              {{ character?.status }}<span v-if="character?.status && character?.species"> · </span
              >{{ character?.species }}
            </span>
          </p>
        </div>
      </div>
    </template>

    <section class="mx-auto max-w-5xl space-y-10 p-4 text-white md:p-10">
      <div v-if="pending" class="py-10 text-center text-ash">Loading...</div>

      <div v-else-if="error" class="py-10 text-center text-ash">Not found</div>

      <div v-else class="space-y-12">
        <div class="space-y-5">
          <div class="flex items-center gap-3">
            <IconsEpisodes class="h-5 w-5" />
            <h2 class="text-2xl font-bold text-white">Episodes</h2>
          </div>

          <div v-if="episodesPending" class="text-ash">Loading episodes...</div>
          <div v-else-if="episodesError" class="text-ash">Could not load episodes.</div>
          <div v-else-if="!episodes.length" class="text-ash">No episode data available.</div>
          <div v-else class="grid gap-4 md:grid-cols-4">
            <article
              v-for="episode in episodes"
              :key="episode.id"
              class="rounded-2xl border border-charcoal bg-obsidian/60 p-5 shadow-lg shadow-black/20"
            >
              <p class="text-lg font-semibold text-white">{{ episode.name }}</p>
              <p class="mt-1 font-semibold text-cyan-brand">{{ episode.episode }}</p>
              <p class="mt-2 text-sm text-ash">{{ formatDate(episode.air_date) }}</p>
            </article>
          </div>
        </div>

        <div class="space-y-5">
          <div class="flex items-center gap-3">
            <IconsLocations class="h-5 w-5" />
            <h2 class="text-2xl font-bold text-white">Locations</h2>
          </div>

          <div v-if="locationPending" class="text-ash">Loading locations...</div>
          <div v-else-if="locationError" class="text-ash">Could not load locations.</div>
          <div v-else-if="!locations.length" class="text-ash">No location data available.</div>
          <div v-else class="grid gap-4 md:grid-cols-4">
            <article
              v-for="location in locations"
              :key="location.id"
              class="rounded-2xl border border-charcoal bg-obsidian/60 p-5 shadow-lg shadow-black/20"
            >
              <p class="text-lg font-semibold text-white">{{ location.name }}</p>
              <p class="mt-1 font-semibold text-cyan-brand">{{ location.type }}</p>
              <p class="mt-2 text-sm text-ash">{{ location.dimension }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
