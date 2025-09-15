import { useState, useEffect } from 'react'
const empty = { brand:'', model:'', price:'', mileage:'', year:'', imageUrl:'', description:'' }

export default function CarForm({ initial, onSubmit, onCancel }) {
  const [data, setData] = useState(empty)
  useEffect(()=>{ setData(initial || empty) },[initial])

  function change(e){ setData({ ...data, [e.target.name]: e.target.value }) }
  function submit(e){
    e.preventDefault()
    const toSend = {
      ...data,
      price: Number(data.price),
      mileage: Number(data.mileage),
      year: Number(data.year)
    }
    onSubmit(toSend)
  }

  return (
    <form className="form" onSubmit={submit}>
      <input className="input" name="brand" placeholder="Marke (z. B. BMW)" value={data.brand} onChange={change} required />
      <input className="input" name="model" placeholder="Modell (z. B. 320d)" value={data.model} onChange={change} required />
      <input className="input" name="price" type="number" placeholder="Preis (CHF)" value={data.price} onChange={change} required />
      <input className="input" name="mileage" type="number" placeholder="Kilometerstand" value={data.mileage} onChange={change} required />
      <input className="input" name="year" type="number" placeholder="Baujahr" value={data.year} onChange={change} required />
      <input className="input full" name="imageUrl" placeholder="Bild-URL (optional)" value={data.imageUrl} onChange={change} />
      <textarea className="input full" name="description" rows={3} placeholder="Kurzbeschreibung" value={data.description} onChange={change} />
      <div className="full" style={{display:'flex',gap:10,justifyContent:'flex-end',marginTop:4}}>
        {onCancel && <button type="button" className="button secondary" onClick={onCancel}>Abbrechen</button>}
        <button className="button" type="submit">Speichern</button>
      </div>
    </form>
  )
}
