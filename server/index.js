import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import carsRouter from './routes/cars.js'

// 1) .env laden
dotenv.config()

// 2) App anlegen
const app = express()

// 3) Middleware (erst JETZT darfst du app.use(...))
const allowed = process.env.NODE_ENV === 'production'
  ? ['https://mern-autotrader.vercel.app']   // deine Vercel-URL
  : ['http://localhost:5173']                // lokal
app.use(cors({ origin: allowed }))
app.use(express.json())
app.use(morgan('dev'))

// 4) Routen
app.get('/api/ping', (_, res) => res.json({ ok: true, message: 'pong' }))
app.get('/', (_, res) => res.send('AutoTrader API läuft 🚗'))
app.use('/api/cars', carsRouter)

// 5) Serverstart + DB
const PORT = process.env.PORT || 4000

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))
  } catch (e) {
    console.error('DB connection failed', e)
    process.exit(1)
  }
}

start()
