import { Achievement } from './Achievement'
import { Console } from './Console'

interface Game {
  id: number
  console: Console
  title: string
  iconImage: string
  gameIcon?: string
  imageTitle?: string
  imageInGame?: string
  imageBoxArt?: string
  publisher?: string
  developer?: string
  genre?: string
  released?: string
  numPossibleAchievements: number
  genre?: string
  flags?: any
  numAchievements?: number
  numDistinctPlayersCasual?: number
  numDistinctPlayersHardcore?: number
  achievements?: Achievement[]
}

export { Game }
