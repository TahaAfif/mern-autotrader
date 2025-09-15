export default function CarCard({ car, onEdit, onDelete }) {
  const km = new Intl.NumberFormat('ch-CH').format(car.mileage || 0)
  const price = new Intl.NumberFormat('ch-CH').format(car.price || 0)

  return (
    <div className="card">
      {car.imageUrl && (
        <img className="car-img" src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
      )}
      <div className="car-head">
        <h3 style={{margin:0}}>{car.brand} {car.model} <span style={{color:'#9aa3af'}}>({car.year})</span></h3>
        <span className="price">{price} CHF</span>
      </div>
      <div className="meta">
        <span>🚦 {km} km</span>
        {car.description ? <span title={car.description}>• {car.description.slice(0,40)}{car.description.length>40?'…':''}</span> : null}
      </div>
      <div className="actions">
        <button className="button ghost" onClick={()=>onEdit(car)}>Bearbeiten</button>
        <button className="button danger" onClick={()=>onDelete(car._id)}>Löschen</button>
      </div>
    </div>
  )
}
