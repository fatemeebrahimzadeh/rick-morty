import { ref } from 'vue'

/**
 * Minimal stub composable; replace with real API calls later.
 */
export function useCharacters() {
  const characters = ref([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  return { characters, loading, error }
}
