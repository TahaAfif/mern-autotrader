import mongoose from 'mongoose'


const CarSchema = new mongoose.Schema(
{
brand: { type: String, required: true },
model: { type: String, required: true },
price: { type: Number, required: true, min: 0 },
mileage: { type: Number, required: true, min: 0 },
year: { type: Number, required: true },
imageUrl: { type: String, default: '' },
description: { type: String, default: '' }
},
{ timestamps: true }
)


export default mongoose.model('Car', CarSchema)