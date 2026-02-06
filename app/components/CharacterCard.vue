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
    class="flex w-[328px] flex-col gap-4 overflow-hidden rounded-2xl border border-charcoal bg-obsidian/70 p-4 shadow-lg shadow-black/20 backdrop-blur md:w-[384px] transition duration-200 hover:-translate-y-1 hover:border-lime-apple"
  >
    <div class="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-charcoal/70">
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
    <div class="space-y-2 p-1 text-white">
      <p class="line-clamp-1 text-lg font-semibold">{{ character.name }}</p>
      <p v-if="character.status || character.species" class="flex items-center gap-2 text-sm text-ash">
        <span
          class="inline-block h-2.5 w-2.5 rounded-full"
          :class="{
            'bg-red-500': character.status?.toLowerCase() === 'dead',
            'bg-lime-apple': character.status?.toLowerCase() === 'alive',
            'bg-ash':
              character.status?.toLowerCase() !== 'dead' &&
              character.status?.toLowerCase() !== 'alive',
          }"
        />
        <span class="truncate">
          {{ character.status }}<span v-if="character.status && character.species"> · </span
          >{{ character.species }}
        </span>
      </p>
    </div>
  </article>
</template>
