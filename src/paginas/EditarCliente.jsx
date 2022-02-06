import Formulario from "../components/Formulario"
import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import Spinner from "../components/Spinner"

const EditarCliente = () => {
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
		cargando  ? <Spinner /> : (
			<>
				{cliente?.nombre ? (
				<>
					<h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
					<p className="mt-3">Llena los siguientes campos para registrar un cliente</p>
					
					<Formulario cliente={cliente} cargando={cargando}  />
				</>
				) : <h1 className="font-black text-4xl text-blue-900">El cliente no existe.</h1>}
			</>
		)
	)

}

export default EditarCliente