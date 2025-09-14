const BASE = import.meta.env.VITE_API_BASE || '' // prod=Backend-URL, lokal leer=Proxy

async function jsonOrError(res) {
  const ct = res.headers.get('content-type') || ''
  const text = await res.text()
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0,200)}`)
  if (!ct.includes('application/json')) throw new Error(`Kein JSON: ${text.slice(0,200)}`)
  return JSON.parse(text)
}

export async function listCars(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE}/api/cars${qs ? `?${qs}` : ''}`)
  return jsonOrError(res)
}
export async function createCar(data) {
  const res = await fetch(`${BASE}/api/cars`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return jsonOrError(res)
}
export async function updateCar(id, data) {
  const res = await fetch(`${BASE}/api/cars/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return jsonOrError(res)
}
export async function deleteCar(id) {
  const res = await fetch(`${BASE}/api/cars/${id}`, { method: 'DELETE' })
  return jsonOrError(res)
}
