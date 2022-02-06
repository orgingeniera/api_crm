import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import Spinner from "../components/Spinner"


const VerCliente = () => {
	//esto llega como un objeto
	const [cliente, setCliente] = useState({})
	const [cargando, setCargando] = useState(true)
	const {id} = useParams()
	useEffect( () =>{	
		const obtenerClienteApi = async () => {
			try{
				const url =`http://localhost:4000/clientes/${id}`
				const respuesta = await fetch(url)
				const resultado = await respuesta.json()
				setCliente(resultado)
			}catch(error){
					console.log(error)
			}
			//cambia el valor que tenga si esta false lo coloca true y viceversa
			setCargando(!cargando)
		}
		obtenerClienteApi()
	}, [])
	return(
		
			cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? 
			 <h1 className="font-black text-4xl text-blue-900">El Cliente no existe</h1> 
			 : (
				<div>
				<h1 className="font-black text-4xl text-blue-900">Ver Cliente: {cliente.nombre}</h1>
				
				<p className="mt-3">Información del Cliente</p>

			
				<p className="text-4xl text-gray-600 mt-10" >
					<span className="text-gray-800 uppercase font-bold">Cliente: </span>
					 {cliente.nombre}
				 </p>
				 <p className="text-2xl text-gray-600 mt-4">
					<span className="text-gray-800 uppercase font-bold">E-mail: </span>
					 {cliente.email}
				 </p>
				 {cliente.telefono && (
				 <p className="text-2xl text-gray-600 mt-4">
					<span className="text-gray-800 uppercase font-bold">Telefono: </span>
					 {cliente.telefono}
				 </p>
				 )}
				 <p className="text-2xl text-gray-600 mt-4">
					<span className="text-gray-800 uppercase font-bold">Empresa: </span>
					 {cliente.empresa}
				 </p>
				 {cliente.notas && (
					 <p className="text-2xl text-gray-600 mt-4">
						<span className="text-gray-800 uppercase font-bold">Notas: </span>
						 {cliente.notas}
					 </p>
				 )}
			 </div>
		)
		
	)

}

export default VerCliente