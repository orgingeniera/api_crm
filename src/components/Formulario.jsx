import React from 'react';
import {Formik, Form, Field} from "formik"
import * as Yup from "yup"
import Alerta from "./Alerta"
import { useNavigate } from 'react-router-dom';
import Spinner from "../components/Spinner"

const Formulario = ({cliente, cargando}) => {
	const history = useNavigate();
	//primero se ejecuta la validación luego el submit
	const nuevoClienteSchema = Yup.object().shape({
		nombre: Yup.string()
				   .min(3,'El nombre es muy corto')
				   .max(20,'El nombre es muy largo')
				   .required('Nombre cliente es obligatorio.'),
		empresa: Yup.string()
					.required('Nombre de la empresa es obligatorio.'),
		email: Yup.string()
				  .email('E-mail no es correcto')
				  .required('Email es obligatorio.'),
		telefono: Yup.number()
						.positive("Número no valido")
					  .integer("Número no valido")		
					 .typeError("El número no es valido"),
		
	})
	const handleSubmit = async (valores) => {
		try {
			let respuesta
			//VErifico que el objeto existe, si existe es porque van a editar
			if(cliente.id){
				const url = `http://localhost:4000/clientes/${cliente.id}`
				respuesta = await fetch(url, {
					//metodo por que ese envia PUT para EDITAR registro
					method: 'PUT',
					//hay que enviar como string cada API tiene sus propias reglas
					body: JSON.stringify(valores),
					//cuando se envia un POST hay que colocarle esto, mirar la documentación
					headers: {
						'Content-Type': 'application/json'
					}
				})
			}else{
				const url = "http://localhost:4000/clientes/editar/"
				respuesta = await fetch(url, {
					//metodo por que ese envia POST para crea nuevo registro
					method: 'POST',
					//hay que enviar como string cada API tiene sus propias reglas
					body: JSON.stringify(valores),
					//cuando se envia un POST hay que colocarle esto, mirar la documentación
					headers: {
						'Content-Type': 'application/json'
					}
				})
			}
			
			 
			 await respuesta.json()
			 history("/clientes");
					
		}catch (error){
			console.log(error)
		}

	} 
	/*
	Creamos una funcion async para utilzar el await y esperar a que se añada el registro
	hasta que no se añada el registro no resetea los campos
		onSubmit={ async (values,{resetForm}) => {
					await handleSubmit(values)

					resetForm()
				}}
	*/
	return(
		cargando ? <Spinner /> : (
		<div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
			<h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente.id ? "Editar Cliente" : "Agregar Cliente"}</h1>
			<Formik
				initialValues = {{
					nombre: cliente?.nombre ?? "",
					empresa: cliente?.empresa ?? "",
					email: cliente?.email ?? "",
					telefono: cliente?.telefono ?? "",
					notas: cliente?.notas ?? ""

				}}
				enableReinitialize={true}

				onSubmit={ async (values,{resetForm}) => {
					await handleSubmit(values)

					resetForm()
				}}
				validationSchema={nuevoClienteSchema}
			>
			{ ({errors, touched}) =>(
				<Form>
					<div className="mb-4">
						<label 
						htmlFor="nombre"
						className="text-gray-800"
						>Nombre</label>
						<Field
							id="nombre"
							type="text"
							className="mt-2 block w-full p-3 bg-gray-50"
							placeholder="Nombre del cliente"
							name="nombre"
						/>
						{errors.nombre && touched.nombre ? (
							<Alerta>{errors.nombre} </Alerta>
						) : null }
					</div>
					<div className="mb-4">
						<label 
						htmlFor="empresa"
						className="text-gray-800"
						>Empresa</label>
						<Field
							id="empresa"
							type="text"
							className="mt-2 block w-full p-3 bg-gray-50"
							placeholder="Empresa del cliente"
							name="empresa"
						/>
						{errors.empresa && touched.empresa ? (
							<Alerta>{errors.empresa} </Alerta>
						) : null }
						
					</div>
					<div className="mb-4">
						<label 
						htmlFor="email"
						className="text-gray-800"
						>E-mail</label>
						<Field
							id="email"
							type="email"
							className="mt-2 block w-full p-3 bg-gray-50"
							placeholder="E-mail del cliente"
							name="email"
						/>
						{errors.email && touched.email ? (
							<Alerta>{errors.email} </Alerta>
						) : null }
					</div>
					<div className="mb-4">
						<label 
						htmlFor="telefono"
						className="text-gray-800"
						>Telefono</label>
						<Field
							id="telefono"
							type="tel"
							className="mt-2 block w-full p-3 bg-gray-50"
							placeholder="Telefono del cliente"
							name="telefono"
						/>
						{errors.telefono && touched.telefono ? (
							<Alerta>{errors.telefono} </Alerta>
						) : null }
					</div>
					<div className="mb-4">
						<label 
						htmlFor="notas"
						className="text-gray-800"
						>Notas:</label>
						<Field
							as="textarea"
							id="notas"
							type="text"
							className="mt-2 block w-full p-3 bg-gray-50 h-40"
							placeholder="Notas del cliente"
							name="notas"
						/>

					</div>
					<input type="submit"
					 value={cliente.id ? "Guardar Cambios" : "Agregar Cliente"}
					 className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
					 />
				</Form>
				)}
			</Formik>
		</div>
		)
	)

}
Formulario.defaultProps = {
	cliente:{},
	cargando: false
}
export default Formulario