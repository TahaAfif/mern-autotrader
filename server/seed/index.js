import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import Car from '../models/Car.js'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


dotenv.config({ path: path.resolve(__dirname, '../.env') })


async function run() {
const uri = process.env.MONGODB_URI
if (!uri) {
console.error('❌ MONGODB_URI fehlt in .env')
process.exit(1)
}


await mongoose.connect(uri)
console.log('✅ Verbunden mit MongoDB')


const jsonPath = path.join(__dirname, 'cars.seed.json')
const raw = fs.readFileSync(jsonPath, 'utf-8')
const data = JSON.parse(raw)


await Car.deleteMany({})
const inserted = await Car.insertMany(data)
console.log(`✅ ${inserted.length} Fahrzeuge importiert`)


await mongoose.disconnect()
console.log('✅ Fertig')
}


run().catch((e) => { console.error(e); process.exit(1) })