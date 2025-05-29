import { useState, useEffect, useRef, useMemo, useReducer } from 'react'
import './App.css'
import axios from 'axios'
import ProductsList from './components/ProductsList';
import { MdErrorOutline } from "react-icons/md";
import type Product from './helpers/interfaces';
import type { FetchState } from './helpers/interfaces';

const initialState:FetchState={
  data:[],
  loading:true,
  error:null
}

function fetchReducer(state:FetchState,action:any):FetchState{
  console.log(`dispatching`,action.type)
  switch(action.type){
    case "FETCH_INIT":
      return {...state,loading:true,error:null}
    
    case "FETCH_SUCCESS":
      return {...state,loading:false,data:action.payload}
    
    case "FETCH_FAILURE":
      return {...state,loading:false,error:action.payload}

    default:
      return state;
  }
}

function App() {
  const [state,dispatch]=useReducer(fetchReducer,initialState);
  const [searchTerm,setSearchTerm] = useState<string>("");// estado para la busqueda
  const searchInputRef = useRef<HTMLInputElement>(null);//ref para el input

  useEffect(()=>{
    const fetchUsers = async():Promise<void> =>{
      dispatch({type:"FETCH_INIT"});
      try {
        const response = await axios.get<Product[]>(`https://fakestoreapi.com/products`);
        dispatch({type:"FETCH_SUCCESS",payload:response.data})
      } catch (error) {
        const message = "Hubo un error"
        dispatch({type:"FETCH_FAILURE",payload:message})  
      }
    };
    fetchUsers();
  },[]);

  //lo usamos para poner el foco en el input
  useEffect(()=>{
    searchInputRef.current?.focus();
  },[state.loading]);

  //lo usamos para filtra eficientemente los usuarios
  const filteredProducts = useMemo(()=>{
    //console.log(`filtrando usuarios`)
    return state.data.filter(({title,category})=> //Aqui se podria usar en vez de .includes, podriamos usar .startWith
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().startsWith(searchTerm.toLowerCase()))
  },[state.data, searchTerm])//Dependencias: se recalcula-solo si users o searchTenm cambian

  if(state.loading){
    return (<div className='flex flex-cold justify-center'>
      <h2>Loading...</h2>
      <div className="loader"></div>
    </div>)
  }

  if(state.error){
    return <p><span className='text-red-500'><MdErrorOutline /></span>Hubo un error...<span className='text-red-500'><MdErrorOutline /></span></p>
  }

  return (
    <div className='p-4 container mx-auto'>
      <h1 className="text-4xl font-bold text-center my-6 text-gray-800">Mi lista de Usuarios</h1>
      <div className='mb-6 flex justify-center'>
        <input 
          placeholder='Busca por nombre, email o username ...' 
          type="text"
          className='w-full max-w-lg p-3 border border-gray-300 rounded-lg shador-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          ref={searchInputRef}
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
      </div>
      <ProductsList products={filteredProducts}/>
    </div>
  )
}

export default App

