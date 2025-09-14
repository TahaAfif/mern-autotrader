export default function CarCard({ car, onEdit, onDelete }) {
return (
<div className="card">
{car.imageUrl && (
<img src={car.imageUrl} alt={`${car.brand} ${car.model}`} style={{ width: '100%', borderRadius: 12, marginBottom: 8, objectFit: 'cover', aspectRatio: '4/3' }} />
)}
<h3 style={{ margin: '8px 0' }}>{car.brand} {car.model} ({car.year})</h3>
<p style={{ margin: 0 }}>Preis: <b>{car.price.toLocaleString()} €</b></p>
<p style={{ margin: '4px 0 8px' }}>Kilometer: {car.mileage.toLocaleString()} km</p>
{car.description && <p style={{ opacity: .8 }}>{car.description}</p>}
<div style={{ display: 'flex', gap: 8 }}>
<button className="button secondary" onClick={() => onEdit(car)}>Bearbeiten</button>
<button className="button" onClick={() => onDelete(car._id)}>Löschen</button>
</div>
</div>
)
}