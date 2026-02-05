import { computed, ref, watch } from 'vue'
import type { CharacterSummary, CharactersResponse } from '~/types/rick-and-morty'

/**
 * Handles characters fetching, search (debounced), and pagination state.
 */
export function useCharacters() {
  const page = ref(1)
  const search = ref('')
  const debouncedSearch = ref('')
  const config = useRuntimeConfig()

  let debounceTimer: ReturnType<typeof setTimeout> | null = null
  watch(search, (value) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      debouncedSearch.value = value.trim()
      page.value = 1
    }, 2000)
  })

  const { data, pending, error, refresh } = useFetch<CharactersResponse>(
    `${config.public.apiBase}/character`,
    {
      query: computed(() => ({
        page: page.value,
        name: debouncedSearch.value || undefined,
      })),
      watch: [page, debouncedSearch],
      lazy: false,
    }
  )

  const characters = computed<CharacterSummary[]>(() => data.value?.results ?? [])
  const pagesCount = computed(() => data.value?.info?.pages ?? 1)

  function searchNow() {
    if (debounceTimer) clearTimeout(debounceTimer)
    debouncedSearch.value = search.value.trim()
    page.value = 1
    refresh()
  }

  function next() {
    if (page.value < pagesCount.value) page.value++
  }

  function goToPage(target: number) {
    const total = pagesCount.value || 1
    page.value = Math.min(Math.max(1, target), total)
  }

  function prev() {
    if (page.value > 1) page.value--
  }

  return {
    page,
    search,
    characters,
    pagesCount,
    pending,
    error,
    searchNow,
    next,
    goToPage,
    prev,
  }
}
