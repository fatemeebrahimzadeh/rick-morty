<script setup lang="ts">
import type { CharacterDetail } from '~/types/rick-and-morty'

const route = useRoute()
const id = route.params.id as string
const config = useRuntimeConfig()

const { data, pending, error } = await useFetch<CharacterDetail>(
  `${config.public.apiBase}/character/${id}`
)

const character = computed(() => data.value)
</script>

<template>
  <NuxtLayout>
    <template #header-context>
      <div class="flex items-center gap-3 text-sm text-slate-600">
        <NuxtLink to="/" class="font-medium text-slate-900 underline-offset-4 hover:underline">
          Characters
        </NuxtLink>
        <span>›</span>
        <span class="font-semibold text-slate-800">Profile</span>
      </div>
    </template>

    <section class="mx-auto max-w-4xl p-4 md:p-8">
      <div v-if="pending" class="py-10 text-center">Loading...</div>

      <div v-else-if="error" class="py-10 text-center">Not found</div>

      <div v-else class="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <img :src="character?.image" :alt="character?.name" class="w-full rounded-2xl border" />

        <div>
          <h1 class="text-2xl font-bold">{{ character?.name }}</h1>
          <p class="mt-2 text-slate-600">{{ character?.status }} • {{ character?.species }}</p>

          <div class="mt-6 space-y-2 text-slate-700">
            <p><span class="font-semibold">Gender:</span> {{ character?.gender }}</p>
            <p><span class="font-semibold">Location:</span> {{ character?.location?.name }}</p>
            <p><span class="font-semibold">Origin:</span> {{ character?.origin?.name }}</p>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
