import express from 'express'
import cors from 'cors'

interface MetricsPayload {
  pauseCount: number
  visibleSeconds: number
  uniqueSecondsPlayed: number
  playedWhileVisibleSeconds: number
  sentAt: string
}

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

let lastPayload: MetricsPayload | null = null

app.post('/metrics', (req, res) => {
  lastPayload = req.body as MetricsPayload
  console.log('\n[metrics received]', JSON.stringify(lastPayload, null, 2))
  res.sendStatus(200)
})

app.get('/metrics', (req, res) => {
  if (!lastPayload) {
    res.status(404).json({ error: 'No metrics received yet' })
    return
  }
  res.json(lastPayload)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
