<script setup lang="ts">
import { ref, watch } from 'vue'
import type { CharacterSummary } from '~/types/rick-and-morty'
import placeholderAvatar from '~/assets/images/placeholder-avatar.jpeg'

const props = defineProps<{
  character: CharacterSummary
}>()

const imgSrc = ref(props.character.image || placeholderAvatar)

watch(
  () => props.character.image,
  (value) => {
    imgSrc.value = value || placeholderAvatar
  }
)

function onImgError() {
  imgSrc.value = placeholderAvatar
}
</script>

<template>
  <article
    class="border-gcharcoal flex w-[328px] flex-col gap-4 overflow-hidden rounded-2xl border p-4 md:w-[384px]"
  >
    <div class="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-charcoal">
      <img
        :src="imgSrc"
        :alt="character.name"
        class="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        @error="onImgError"
      />
    </div>
    <div class="space-y-1 p-3 text-white">
      <p class="line-clamp-1 font-bold">{{ character.name }}</p>
      <p v-if="character.status || character.species" class="flex items-center gap-2 text-sm">
        <span
          class="inline-block h-2 w-2 rounded-full"
          :class="{
            'bg-red-500': character.status?.toLowerCase() === 'dead',
            'bg-emerald-500': character.status?.toLowerCase() === 'alive',
            'bg-slate-400':
              character.status?.toLowerCase() !== 'dead' &&
              character.status?.toLowerCase() !== 'alive',
          }"
        />
        <span class="truncate">
          {{ character.status }}<span v-if="character.status && character.species"> - </span
          >{{ character.species }}
        </span>
      </p>
    </div>
  </article>
</template>
