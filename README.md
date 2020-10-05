# RetroAchievements-API-Client

This package provides a way to interface with the Retro Achievements API via a web browser

## Usage

```javascript
const client = new RetroAchievementsAPI('your-api-key', 'your-api-username')

const run = async () => {
  try {
    const username = 'noot'
    const offset = 0
    const limit = 10
    const user = await client.getUserRecentlyPlayed(username, offset, limit)

    console.log({ user })
  } catch (e) {
    console.error(e)
  }
}

run()
```
