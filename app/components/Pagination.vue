<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  prev: []
  next: []
}>()

const isFirst = computed(() => props.currentPage <= 1)
const isLast = computed(() => props.currentPage >= props.totalPages)
</script>

<template>
  <nav class="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-200">
    <button
      class="rounded-xl border border-gray-300 px-4 py-2 disabled:opacity-40 dark:border-gray-700"
      :disabled="isFirst"
      @click="emit('prev')"
    >
      Prev
    </button>

    <span class="text-sm text-gray-500 dark:text-gray-400">
      Page {{ currentPage }} / {{ totalPages || 1 }}
    </span>

    <button
      class="rounded-xl border border-gray-300 px-4 py-2 disabled:opacity-40 dark:border-gray-700"
      :disabled="isLast"
      @click="emit('next')"
    >
      Next
    </button>
  </nav>
</template>
