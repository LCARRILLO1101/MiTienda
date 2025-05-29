import { useState, useEffect, useRef, useMemo, useReducer } from 'react'
import './App.css'
import axios from 'axios'
import ProductsList from './components/ProductsList';
import { MdErrorOutline } from "react-icons/md";
import type Product from './helpers/interfaces';
import type { FetchState } from './helpers/interfaces';



function App() {
  const [products,setProducts] = useState<Product[]>([]);
  const [loading,setLoading] = useState<boolean>(true);
  const [error,setError] = useState<string|null>(null);

  useEffect(()=>{
    const fetchProducts = async():Promise<void>=>{
      try{
        const res = await axios.get<Product[]>(`https://fakestoreapi.com/products`);
        setProducts(res.data);
        setLoading(false);
      }catch (error){
        if(error instanceof Error){
          setLoading(false);
          setError(error.message);
        }else{
          setLoading(false);
          setError(`Hubo un error en la cunsulta`);
        }
        console.log(`Error al consultar los productos`)
      }
    }

    fetchProducts();

  },[]);

  console.log(products)

  if(loading){
    return (<div className='flex flex-cold justify-center'>
      <h2>Loading...</h2>
      <div className="loader"></div>
    </div>)
  }

  if(error){
    return <p><span className='text-red-500'><MdErrorOutline /></span>Hubo un error...<span className='text-red-500'><MdErrorOutline /></span></p>
  }

  return (
    <>
      <ProductsList products={products}/>
    </>
  )
}

export default App

