import { Game, RecentlyPlayedGame } from './types/Game'
import { Console } from './types/Console'

/**
 * This class provides an entry point into the Retro Achievements API
 */
class RetroAchievementsAPI {
  private _apiKey: string
  private _apiUsername: string
  private _apiBaseURL: string

  constructor(apiKey: string, apiUsername: string) {
    this._apiKey = apiKey
    this._apiUsername = apiUsername
    this._apiBaseURL = 'https://retroachievements.org/API/'
  }

  async getGameInfo(gameId: number): Promise<Game> {
    try {
      const url = new URL('API_GetGame.php', this._apiBaseURL)
      url.searchParams.set('z', this._apiUsername)
      url.searchParams.set('y', this._apiKey)
      url.searchParams.set('i', gameId.toString())
      const response = await fetch(url.toString())
      const {
        Title: title,
        ConsoleID,
        ConsoleName,
        Flags: flags,
        ImageIcon: imageIcon,
        GameIcon: gameIcon,
        ImageTitle: imageTitle,
        ImageIngame: imageInGame,
        ImageBoxArt: imageBoxArt,
        Publisher: publisher,
        Developer: developer,
        Genre: genre,
        Released: released,
      } = await response.json()

      return {
        id: gameId,
        title,
        console: {
          id: +ConsoleID,
          name: ConsoleName,
        },
        flags,
        imageIcon,
        imageTitle,
        imageInGame,
        imageBoxArt,
        publisher,
        developer,
        genre,
        gameIcon,
        released,
      }
    } catch (e) {
      return e
    }
  }

  async getGamesForConsole(consoleId: number): Promise<Game[]> {
    try {
      const url = new URL('API_GetGameList.php', this._apiBaseURL)
      url.searchParams.set('z', this._apiUsername)
      url.searchParams.set('y', this._apiKey)
      url.searchParams.set('i', consoleId.toString())
      const response = await fetch(url.toString())
      const data = await response.json()
      const mapped = data.map(
        ({ Title, ID, ConsoleID, ImageIcon, ConsoleName }: any) => ({
          id: +ID,
          title: Title,
          console: {
            id: +ConsoleID,
            name: ConsoleName,
          },
          imageIcon: ImageIcon,
        }),
      )
      return mapped
    } catch (e) {
      return e
    }
  }

  async getConsoles(): Promise<Console[]> {
    try {
      const url = new URL('API_GetConsoleIDs.php', this._apiBaseURL)
      url.searchParams.set('z', this._apiUsername)
      url.searchParams.set('y', this._apiKey)
      const response = await fetch(url.toString())
      const data = await response.json()
      const mapped = data.map(({ ID, Name }: any) => ({
        id: +ID,
        name: Name,
      }))
      return mapped
    } catch (e) {
      return e
    }
  }

  async getUserRecentlyPlayed(
    username: string,
    offset: number,
    count: number,
  ): Promise<RecentlyPlayedGame[]> {
    try {
      const url = new URL(
        'API_GetUserRecentlyPlayedGames.php',
        this._apiBaseURL,
      )
      url.searchParams.set('z', this._apiUsername)
      url.searchParams.set('y', this._apiKey)
      url.searchParams.set('u', username)
      url.searchParams.set('offset', offset.toString())
      url.searchParams.set('c', count.toString())

      const response = await fetch(url.toString())
      const data = await response.json()

      // Transform the data into the desired format
      const mapped = data.map(
        ({
          GameID,
          ConsoleID,
          ConsoleName,
          Title,
          ImageIcon,
          LastPlayed,
          MyVote,
          NumPossibleAchievements,
          PossibleScore,
          NumAchieved,
          ScoreAchieved,
        }: any) => ({
          id: +GameID,
          console: {
            id: +ConsoleID,
            name: ConsoleName,
          },
          title: Title,
          imageIcon: ImageIcon,
          numPossibleAchievements: NumPossibleAchievements,
          lastPlayed: LastPlayed,
          vote: MyVote,
          achievements: {
            possibleScore: +PossibleScore,
            numAchieved: +NumAchieved,
            scoreAchieved: +ScoreAchieved,
          },
        }),
      )

      return mapped
    } catch (e) {
      return e
    }
  }
  async getUserRankAndScore(
    username: string,
  ): Promise<{ score: number; rank: number }> {
    try {
      const url = new URL('API_GetUserRankAndScore.php', this._apiBaseURL)
      url.searchParams.set('z', this._apiUsername)
      url.searchParams.set('y', this._apiKey)
      url.searchParams.set('u', username)

      const response = await fetch(url.toString())
      const data = await response.json()

      // If a username does not exist, the score will return as null
      if (!data['Score']) {
        throw new Error('Invalid username')
      }

      // Standardize the data
      return {
        score: +data['Score'],
        rank: +data['Rank'],
      }
    } catch (e) {
      return e
    }
  }
}

export { RetroAchievementsAPI }
