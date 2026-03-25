import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

interface MetricsPayload {
  pauseCount: number
  visibleSeconds: number
  uniqueSecondsPlayed: number
  playedWhileVisibleSeconds: number
  sentAt: string
}

const app = express()
const PORT = process.env.PORT || 3001

const FRONTEND_URLS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(u => u.trim())
  .filter(Boolean)

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true)

    if (FRONTEND_URLS.length === 0 || FRONTEND_URLS.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  credentials: true,
}

app.use(cors(corsOptions))
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

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})