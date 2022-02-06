import {useEffect, useState} from 'react';
import Cliente from "../components/Cliente"


const Inicio = () => {
	const [clientes, setClientes] = useState([])
	useEffect( () => {
		const obtenerClientesApi = async () => {
			try
			{
				const url = 'http://localhost:4000/clientes'
				const respuesta = await fetch(url)
				const resultado = await respuesta.json()
				
				setClientes(resultado)

			}
			catch (error){
				console.log(error)
			}
		}
		obtenerClientesApi()
	},[] )
	const handleEliminar = async  id => {
		const confirmar = confirm("Desea eliminar este registro")
		if (confirmar) {
			try{
				const url = `http://localhost:4000/clientes/${id}`
				const respuesta = await fetch(url, {
					method: 'DELETE'
				})
				await respuesta.json()

				const arrayClientes = clientes.filter( cliente => cliente.id !== id)
				setClientes(arrayClientes)
			}catch (error){
				console.log(error)
			}
		}
	}
	return(
		<div>
			<h1 className="font-black text-4xl text-blue-900">Clientes</h1>
			<p className="mt-3">Administra tus cliente</p>

			<table className="w-full mt-5 table-auto shadow bg-white">
			<thead className="bg-blue-800 text-white">
				<th className="p-2">Nombre</th>
				<th className="p-2">Contacto</th>
				<th className="p-2">Empresa</th>
				<th className="p-2">Acciones</th>

			</thead>
			<tbody>
				{clientes.map( cliente => (
					<Cliente
					 key={cliente.id}
					 cliente={cliente}
					 handleEliminar ={handleEliminar}
					  />
					))}
			</tbody>	

			</table>

		</div>
	)

}

export default Inicio