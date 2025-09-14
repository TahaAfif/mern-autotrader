import { useState, useEffect } from 'react'


const empty = { brand: '', model: '', price: '', mileage: '', year: '', imageUrl: '', description: '' }


export default function CarForm({ initial, onSubmit, onCancel }) {
const [data, setData] = useState(empty)
useEffect(() => { setData(initial || empty) }, [initial])


function change(e) { setData({ ...data, [e.target.name]: e.target.value }) }
function submit(e) {
e.preventDefault()
const toSend = { ...data, price: Number(data.price), mileage: Number(data.mileage), year: Number(data.year) }
onSubmit(toSend)
}


return (
<form className="form" onSubmit={submit}>
<input className="input" name="brand" placeholder="Marke" value={data.brand} onChange={change} required />
<input className="input" name="model" placeholder="Modell" value={data.model} onChange={change} required />
<input className="input" name="price" type="number" placeholder="Preis (€)" value={data.price} onChange={change} required />
<input className="input" name="mileage" type="number" placeholder="Kilometerstand" value={data.mileage} onChange={change} required />
<input className="input" name="year" type="number" placeholder="Baujahr" value={data.year} onChange={change} required />
<input className="input full" name="imageUrl" placeholder="Bild-URL (optional)" value={data.imageUrl} onChange={change} />
<textarea className="input full" name="description" placeholder="Beschreibung" value={data.description} onChange={change} rows={3} />
<div className="full" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
{onCancel && <button type="button" className="button secondary" onClick={onCancel}>Abbrechen</button>}
<button className="button" type="submit">Speichern</button>
</div>
</form>
)
}