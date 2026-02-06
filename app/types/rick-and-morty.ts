export type LocationRef = {
  name: string
  url?: string
}

export type CharacterSummary = {
  id: number
  name: string
  image: string
  status: string
  species: string
}

export type CharacterDetail = CharacterSummary & {
  gender: string
  location: LocationRef
  origin: LocationRef
  episode: string[]
}

export type CharactersResponse = {
  info: { pages: number }
  results: CharacterSummary[]
}

export type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
}

export type LocationDetail = {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
}
