import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import carsRouter from './routes/cars.js'


dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.get('/api/ping', (_, res) => res.json({ ok: true, message: 'pong' }))
app.use('/api/cars', carsRouter)


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