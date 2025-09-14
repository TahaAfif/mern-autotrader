import { createContext, useContext, useEffect, useReducer } from 'react'
import { listCars, createCar, updateCar, deleteCar } from '../api/cars'


const CarsContext = createContext()


const initial = { cars: [], loading: false, error: null, query: '' }


function reducer(state, action) {
switch (action.type) {
case 'loading': return { ...state, loading: true, error: null }
case 'error': return { ...state, loading: false, error: action.error }
case 'setCars': return { ...state, loading: false, cars: action.cars }
case 'setQuery': return { ...state, query: action.query }
default: return state
}
}


export function CarsProvider({ children }) {
const [state, dispatch] = useReducer(reducer, initial)


async function refresh() {
try {
dispatch({ type: 'loading' })
const cars = await listCars(state.query ? { q: state.query } : undefined)
dispatch({ type: 'setCars', cars })
} catch (e) { dispatch({ type: 'error', error: e.message }) }
}


async function addCar(data) { await createCar(data); await refresh() }
async function editCar(id, data) { await updateCar(id, data); await refresh() }
async function removeCar(id) { await deleteCar(id); await refresh() }


useEffect(() => { refresh() }, [])


const value = { ...state, dispatch, refresh, addCar, editCar, removeCar }
return <CarsContext.Provider value={value}>{children}</CarsContext.Provider>
}


export function useCars() { return useContext(CarsContext) }