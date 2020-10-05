import { Achievement } from './Achievement'
import { Game } from './Game'

interface UserSummary {
  id: number
  recentlyPlayed: Game[]
  lastGame: Game
  meta: {
    memberSince: string
    status: string
    lastRichPresenceMessage: string
  }
  profile: {
    avataURL: string
    motto: string
    rank: number
    points: number
    totalPoints: number
    totalTruePoints: number
    contribCount: number
    contribYeild: number
  }
  achievements: {
    awarded: Achievement[]
    recent: {
      [gameId: number]: Achievement[]
    }
  }
}

export { UserSummary }
