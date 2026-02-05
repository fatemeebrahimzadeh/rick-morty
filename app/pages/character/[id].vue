<script setup lang="ts">
import type { CharacterDetail } from '~/types/rick-and-morty'

const route = useRoute()
const id = route.params.id as string

const { data, pending, error } = await useFetch<CharacterDetail>(
  `https://rickandmortyapi.com/api/character/${id}`
)

const character = computed(() => data.value)
</script>

<template>
  <main class="min-h-screen p-4 md:p-8">
    <div class="max-w-4xl mx-auto">
      <NuxtLink to="/" class="underline">← Back</NuxtLink>

      <div v-if="pending" class="py-10 text-center">Loading...</div>

      <div v-else-if="error" class="py-10 text-center">Not found</div>

      <div v-else class="mt-6 grid md:grid-cols-2 gap-6">
        <img
          :src="character?.image"
          :alt="character?.name"
          class="w-full rounded-2xl border"
        />

        <div>
          <h1 class="text-2xl font-bold">{{ character?.name }}</h1>
          <p class="mt-2 opacity-80">
            {{ character?.status }} • {{ character?.species }}
          </p>

          <div class="mt-6 space-y-2">
            <p><span class="font-semibold">Gender:</span> {{ character?.gender }}</p>
            <p><span class="font-semibold">Location:</span> {{ character?.location?.name }}</p>
            <p><span class="font-semibold">Origin:</span> {{ character?.origin?.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
