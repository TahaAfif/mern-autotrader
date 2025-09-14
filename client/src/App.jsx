import { useState } from 'react'
import { CarsProvider, useCars } from './context/CarsContext'
import CarCard from './components/CarCard'
import CarForm from './components/CarForm'
import './styles.css'


function CarsPage() {
const { cars, loading, error, dispatch, query, addCar, editCar, removeCar } = useCars()
const [editing, setEditing] = useState(null)


return (
<div className="container">
<div className="header">
<h1 style={{ margin: 0 }}>AutoTrader (MERN)</h1>
<input className="input" placeholder="Suche nach Marke/Modell…" value={query}
onChange={(e) => dispatch({ type: 'setQuery', query: e.target.value })}
onKeyDown={(e)=>{ if(e.key==='Enter') dispatch({ type:'loading'}) }} />
</div>


<div className="card" style={{ marginTop: 16 }}>
<h2 style={{ marginTop: 0 }}>{editing? 'Fahrzeug bearbeiten' : 'Neues Fahrzeug'}</h2>
<CarForm
initial={editing}
onSubmit={async (data) => {
if (editing) { await editCar(editing._id, data); setEditing(null) }
else { await addCar(data) }
}}
onCancel={() => setEditing(null)}
/>
</div>


{loading && <p>Lade…</p>}
{error && <p style={{ color: 'red' }}>{error}</p>}


<div className="grid">
{cars.map((c) => (
<CarCard key={c._id} car={c} onEdit={setEditing} onDelete={removeCar} />
))}
</div>
</div>
)
}


export default function App() {
return (
<CarsProvider>
<CarsPage />
</CarsProvider>
)
}