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

  async getUserRecentlyPlayed(username: string, offset: number, count: number) {
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

      return data
    } catch (e) {
      return e
    }
  }
  async getUserRankAndScore(
    username: string,
  ): Promise<{ Score: number; Rank: number }> {
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
        Score: +data['Score'],
        Rank: +data['Rank'],
      }
    } catch (e) {
      return e
    }
  }
}

export { RetroAchievementsAPI }
