<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  first: []
  prev: []
  go: [page: number]
  next: []
  last: []
}>()

const isFirst = computed(() => props.currentPage <= 1)
const isLast = computed(() => props.currentPage >= props.totalPages)

const pages = computed<(number | 'ellipsis')[]>(() => {
  const total = Math.max(props.totalPages, 1)
  const current = Math.min(Math.max(props.currentPage, 1), total)

  const windowSize = 3
  let start = current - 2
  let end = current + 2

  if (start < 1) {
    end += 1 - start
    start = 1
  }
  if (end > total) {
    start -= end - total
    end = total
  }

  start = Math.max(1, start)
  end = Math.min(total, end)

  // Ensure we don't exceed the window size
  if (end - start + 1 > windowSize) {
    end = start + windowSize - 1
  }

  const items: (number | 'ellipsis')[] = []

  if (start > 1) items.push('ellipsis')

  for (let i = start; i <= end; i++) {
    items.push(i)
  }

  if (end < total) items.push('ellipsis')

  return items
})
</script>

<template>
  <nav class="flex items-center gap-2 text-sm text-ash max-w-[328px] md:max-w-auto">
    <button
      class="flex h-8 w-8 items-center justify-center rounded-full text-xs disabled:opacity-40"
      :disabled="isFirst"
      @click="emit('first')"
      aria-label="First page"
    >
      «
    </button>
    <button
      class="flex h-8 w-8 items-center justify-center rounded-full text-xs disabled:opacity-40"
      :disabled="isFirst"
      @click="emit('prev')"
      aria-label="Previous page"
    >
      ‹
    </button>

    <template v-for="(item, index) in pages" :key="`${item}-${index}`">
      <span v-if="item === 'ellipsis'" class="px-1 text-slate-500">…</span>
      <button
        v-else
        class="flex h-8 min-w-[32px] items-center justify-center rounded-full px-2 text-xs font-semibold transition"
        :class="item === currentPage ? 'bg-lime-apple text-obsidian' : 'text-slate-200 hover:bg-slate-700'"
        @click="emit('go', item)"
      >
        {{ item }}
      </button>
    </template>

    <button
      class="flex h-8 w-8 items-center justify-center rounded-full text-xs disabled:opacity-40"
      :disabled="isLast"
      @click="emit('next')"
      aria-label="Next page"
    >
      ›
    </button>
    <button
      class="flex h-8 w-8 items-center justify-center rounded-full text-xs disabled:opacity-40"
      :disabled="isLast"
      @click="emit('last')"
      aria-label="Last page"
    >
      »
    </button>
  </nav>
</template>
