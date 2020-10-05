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

    console.log(rankAndScore)

    rankAndScore.should.be.a('object')
    rankAndScore.should.have.property('Score')
    rankAndScore.should.have.property('Rank')
  })
})
