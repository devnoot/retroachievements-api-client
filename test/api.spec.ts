const { RetroAchievementsAPI } = require('../lib/RetroAchievementsAPI')
global.fetch = require('node-fetch')
const should = require('chai').should()

describe('Test api handler class', () => {
  it("Should get the user's rank and score", async () => {
    const client = new RetroAchievementsAPI(
      'WlTIDmee2lK0Z0EAIeBexOr0AKvXd1qF',
      'noot',
    )
    const rankAndScore = await client.getUserRankAndScore('noot')
    rankAndScore.should.be.a('object')
    rankAndScore.should.have.property('score')
    rankAndScore.should.have.property('rank')
  })

  it("Should get a user's recently played games", async () => {
    const client = new RetroAchievementsAPI(
      'WlTIDmee2lK0Z0EAIeBexOr0AKvXd1qF',
      'noot',
    )

    await client.getUserRecentlyPlayed('noot', 0, 5)
  })

  it('Should get games for a connsole', async () => {
    const client = new RetroAchievementsAPI(
      'WlTIDmee2lK0Z0EAIeBexOr0AKvXd1qF',
      'noot',
    )

    const data = await client.getGamesForConsole(4)

    console.log(data)
  })
})
