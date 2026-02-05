export type LocationRef = {
  name: string
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
}

export type CharactersResponse = {
  info: { pages: number }
  results: CharacterSummary[]
}
