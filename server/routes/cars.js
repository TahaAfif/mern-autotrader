import { Router } from 'express'
import Car from '../models/Car.js'


const router = Router()


// CREATE
router.post('/', async (req, res) => {
try {
const car = await Car.create(req.body)
res.status(201).json(car)
} catch (err) {
res.status(400).json({ error: err.message })
}
})


// READ (mit einfacher Suche/Filter)
router.get('/', async (req, res) => {
try {
const { q, minPrice, maxPrice } = req.query
const filter = {}
if (q) {
filter.$or = [
{ brand: new RegExp(q, 'i') },
{ model: new RegExp(q, 'i') }
]
}
if (minPrice || maxPrice) {
filter.price = {}
if (minPrice) filter.price.$gte = Number(minPrice)
if (maxPrice) filter.price.$lte = Number(maxPrice)
}
const cars = await Car.find(filter).sort({ createdAt: -1 })
res.json(cars)
} catch (err) {
res.status(500).json({ error: err.message })
}
})


// READ by id
router.get('/:id', async (req, res) => {
try {
const car = await Car.findById(req.params.id)
if (!car) return res.status(404).json({ error: 'Not found' })
res.json(car)
} catch (err) {
res.status(400).json({ error: 'Invalid ID' })
}
})


// UPDATE
router.put('/:id', async (req, res) => {
try {
const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
if (!car) return res.status(404).json({ error: 'Not found' })
res.json(car)
} catch (err) {
res.status(400).json({ error: err.message })
}
})


// DELETE
router.delete('/:id', async (req, res) => {
try {
const car = await Car.findByIdAndDelete(req.params.id)
if (!car) return res.status(404).json({ error: 'Not found' })
res.json({ ok: true })
} catch (err) {
res.status(400).json({ error: 'Invalid ID' })
}
})


export default router