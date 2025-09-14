export async function listCars(params = {}) {
const qs = new URLSearchParams(params).toString()
const res = await fetch(`/api/cars${qs ? `?${qs}` : ''}`)
return res.json()
}


export async function createCar(data) {
const res = await fetch('/api/cars', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
return res.json()
}


export async function updateCar(id, data) {
const res = await fetch(`/api/cars/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
return res.json()
}


export async function deleteCar(id) {
const res = await fetch(`/api/cars/${id}`, { method: 'DELETE' })
return res.json()
}