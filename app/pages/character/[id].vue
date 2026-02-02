<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 p-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-green-400">
        Character #{{ id }}
      </h1>
      <p class="mt-4 text-gray-300">
        Detail view placeholder. Hook this up to your API when ready.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id)
</script>
