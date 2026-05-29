export interface Person {
  id: string
  gen: number
  fatherId: string | null
  nameEn: string
  nameAr: string
  firstEn: string
  firstAr: string
  born: number
  died: number | null
  bornCirca: boolean
  diedCirca: boolean
  placeEn: string
  placeAr: string
  verified: boolean
  honorific: string
  bioEn: string
  bioAr: string
  sourcesEn: string[]
  monogramAr: string
  monogramEn: string
}

export interface RelResult {
  lca: string
  aPath: string[]
  bPath: string[]
  aSteps: number
  bSteps: number
}

export interface Stats {
  total: number
  generationCount: number
  perGen: Array<{ gen: number; count: number }>
  avgChildren: number
  fathersCount: number
  verified: number
  earliestBorn: number
  latestBorn: number
}

export interface KarajahData {
  people: Person[]
  byId: Record<string, Person>
  byGen: Record<number, Person[]>
  generations: number[]
  childrenOf: Record<string, string[]>
  ancestors: (id: string) => string[]
  relationship: (aId: string, bId: string) => RelResult | null
  descendantCount: (id: string) => number
  topBranches: (atGen?: number) => Array<{ p: Person; count: number }>
  stats: () => Stats
  root: Person
}

export type Lang = 'ar' | 'en'
export type TreeLayout = 'tidy' | 'columns' | 'radial'
export type { Palette } from './config'
export type FilterMode = 'all' | 'single' | 'range'
export type SheetName = 'search' | 'filter' | 'person' | 'relate' | 'stats' | 'menu' | null
