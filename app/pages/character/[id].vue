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
      <div class="flex flex-col gap-4 text-white md:flex-row md:gap-20">
        <img
          :src="character?.image"
          :alt="character?.name"
          class="h-20 w-20 rounded-lg border border-steel object-cover md:h-[240px] md:w-[240px]"
        />
        <div class="flex flex-col md:justify-center">
          <h1 class="text-2xl font-bold">{{ character?.name }}</h1>
          <p
            v-if="character?.status || character?.species"
            class="flex items-center gap-2 text-sm text-ash"
          >
            <span
              class="inline-block h-2 w-2 rounded-full"
              :class="{
                'bg-red-500': character?.status?.toLowerCase() === 'dead',
                'bg-emerald-500': character?.status?.toLowerCase() === 'alive',
                'bg-slate-400':
                  character?.status?.toLowerCase() !== 'dead' &&
                  character?.status?.toLowerCase() !== 'alive',
              }"
            />
            <span class="truncate">
              {{ character?.status }}<span v-if="character?.status && character?.species"> - </span
              >{{ character?.species }}
            </span>
          </p>
        </div>
      </div>
    </template>

    <section class="mx-auto max-w-5xl space-y-8 p-4 text-white md:p-8">
      <div v-if="pending" class="py-10 text-center text-ash">Loading...</div>

      <div v-else-if="error" class="py-10 text-center text-ash">Not found</div>

      <div v-else class="space-y-10">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <IconsEpisodes class="h-5 w-5" />
            <h2 class="text-2xl font-bold">Episodes</h2>
          </div>

          <div v-if="episodesPending">Loading episodes...</div>
          <div v-else-if="episodesError">Could not load episodes.</div>
          <div v-else-if="!episodes.length">No episode data available.</div>
          <div v-else class="grid gap-4 md:grid-cols-4">
            <article
              v-for="episode in episodes"
              :key="episode.id"
              class="rounded-2xl bg-cyan-glow p-5 text-white shadow-md"
            >
              <p class="text-lg font-semibold">{{ episode.name }}</p>
              <p class="mt-1 font-semibold text-cyan-brand">{{ episode.episode }}</p>
              <p class="mt-2 text-sm text-ash">{{ formatDate(episode.air_date) }}</p>
            </article>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <IconsLocations class="h-5 w-5" />
            <h2 class="text-2xl font-bold">Locations</h2>
          </div>

          <div v-if="locationPending">Loading locations...</div>
          <div v-else-if="locationError">Could not load locations.</div>
          <div v-else-if="!locations.length">No location data available.</div>
          <div v-else class="grid gap-4 md:grid-cols-4">
            <article
              v-for="location in locations"
              :key="location.id"
              class="rounded-2xl bg-cyan-glow p-5 text-white shadow-md"
            >
              <p class="text-lg font-semibold">{{ location.name }}</p>
              <p class="mt-1 font-semibold text-cyan-brand">{{ location.type }}</p>
              <p class="mt-2 text-sm text-ash">{{ location.dimension }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
