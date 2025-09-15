import { useState } from 'react'
import { CarsProvider, useCars } from './context/CarsContext'
import CarCard from './components/CarCard'
import CarForm from './components/CarForm'
import './styles.css'

function CarsPage() {
  const { cars, loading, error, dispatch, query, addCar, editCar, removeCar, page, pages, total, refresh } = useCars()
  const [editing, setEditing] = useState(null)

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">
            <span style={{fontSize:22}}>🚗</span>
            <span>AutoTrader</span>
          </div>
          <div className="searchbar">
            <span>🔎</span>
            <input
              placeholder="Suche: Marke oder Modell…"
              value={query}
              onChange={(e)=>dispatch({type:'setQuery', query: e.target.value})}
              onKeyDown={(e)=>{ if(e.key==='Enter') refresh({ page:1 })}}
            />
            <button className="button" onClick={()=>refresh({ page:1 })}>Suchen</button>
          </div>
        </div>
      </nav>

      <header className="hero">
        <h1>Fahrzeuge verwalten</h1>
        <p>Erstellen, bearbeiten, löschen (Live-Daten aus MongoDB).</p>
      </header>

      <main className="container">
        <div className="card" style={{marginTop:16}}>
          <h2 style={{marginTop:0}}>{editing ? 'Fahrzeug bearbeiten' : 'Neues Fahrzeug'}</h2>
          <CarForm
            initial={editing}
            onSubmit={async (data) => {
              if (editing) { await editCar(editing._id, data); setEditing(null) }
              else { await addCar(data) }
            }}
            onCancel={() => setEditing(null)}
          />
        </div>

        <hr className="sep" />

        {loading && <div className="empty">Lade Fahrzeuge …</div>}
        {error && <div className="empty" style={{color:'#fca5a5'}}>Fehler: {error}</div>}
        {!loading && cars.length === 0 && <div className="empty">Keine Fahrzeuge gefunden.</div>}

        <div className="grid">
          {cars.map((c) => (
            <CarCard key={c._id} car={c} onEdit={setEditing} onDelete={removeCar} />
          ))}
        </div>
      </main>
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