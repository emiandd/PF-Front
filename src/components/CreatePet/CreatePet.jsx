import React, { useState } from 'react';
import NavBar from '../../assets/NavBar/NavBar';
// import Footer from '../../assets/Footer/Footer';
import s from '../../css/CreatePet.module.css';

export default function CreatePet() {

	const [input, setInput] = useState({
		type: '',
		age: '',
		petName: '',
		genre: '',
		size: '',
		color: '',
		hairType: '',
		vaccines: false,
		castrated: false,
		specialCare: false,
		image: ''
	})

	const [error, setError] = useState({})

	function validate(input){

		let error = {};
		let regex = /[\d|\-|¿|'|?|.|,|=|~|¡|+|^|{|}|<|>|!]/i;

		if(!input.type){
			error.type = 'Selecciona un tipo';
		}

		if(!input.age){
			error.age = 'Selecciona una edad';
		}

		if(!input.petName){
			error.petName = 'El nombre es requerido';
		}else if(regex.test(input.petName)){
			error.petName = 'Ingresa sólo caracteres válidos'
		}

		if(!input.genre){
			error.genre = 'Selecciona un género';
		}

		if(!input.size){
			error.size = 'Selecciona un tamaño';
		}

		if(!input.color){
			error.color = 'Selecciona un color';
		}

		if(!input.hairType){
			error.hairType = 'Selecciona un tipo de pelo';
		}

		if(!input.vaccines){
			error.vaccines = 'Debes seleccionar una opción';
		}

		if(!input.castrated){
			error.castrated = 'Debes seleccionar una opción';
		}

		if(!input.specialCare){
			error.specialCare = 'Debes seleccionar una opción';
		}

		if(!input.image){
			error.image = 'Una imagen de tu mascota es requerida';
		}

		return error;

	}

	function handleChange(e){
		e.preventDefault();

		setInput({...input,
			[e.target.name]: e.target.value
		})

		setError(validate({
			...input,
			[e.target.name]: e.target.value
		}))
	}


	return (
		<div>
			<NavBar />
			<div className={s.container}>
				<div className={s.left}>
					<div className={s.overflow}></div>
				</div>
				<div className={s.right}>
					<h1>Crear Mascota</h1>
					<div>
						<select onChange={(e) => handleChange(e)} name="type" id="">
							<option value="">Tipo</option>
							<option value="cat">Gato</option>
							<option value="dog">Perro</option>
						</select>
						{ error.type && <p className={s.error}>{error.type}</p> }
					</div>
					<div>
						<select onChange={(e) => handleChange(e)} name="age" id="">
							<option value="">Edad</option>
							<option value="puppy">Cachorro</option>
							<option value="young">Joven</option>
							<option value="adult">Adulto</option>
							<option value="senior">Mayor</option>
						</select>
						{ error.age && <p className={s.error}>{error.age}</p> }
					</div>
					<div>
						<input onChange={(e) => handleChange(e)} name="petName" type="text" placeholder="Nombre de tu mascota" />
						{ error.petName && <p className={s.error}>{error.petName}</p> }
					</div>
					<div>
						<select onChange={(e) => handleChange(e)} name="genre" id="">
							<option value="">Género</option>
							<option value="male">Macho</option>
							<option value="female">Hembra</option>
						</select>
						{ error.genre && <p className={s.error}>{error.genre}</p> }
					</div>
					<div>
						<select onChange={(e) => handleChange(e)} name="size" id="">
							<option value="">Tamaño</option>
							<option value="small">Pequeño</option>
							<option value="medium">Mediano</option>
							<option value="large">Grande</option>
							<option value="extraLarge">Extra Grande</option>
						</select>
						{ error.size && <p className={s.error}>{error.size}</p> }
					</div>
					<div>
						<select onChange={(e) => handleChange(e)} name="color" id="">
							<option value="">Color</option>
							<option value="black">Negro</option>
							<option value="brown">Marrón</option>
							<option value="white">Blanco</option>
						</select>
						{ error.color && <p className={s.error}>{error.color}</p> }
					</div>
					<div>
						<select onChange={(e) => handleChange(e)} name="hairType" id="">
							<option value="">Tipo de Pelo</option>
							<option value="hairless">Sin Pelo</option>
							<option value="short">Corto</option>
							<option value="medium">Medio</option>
							<option value="large">Largo</option>
							<option value="wire">Alambre</option>
							<option value="curly">Crespo</option>
						</select>
						{ error.hairType && <p className={s.error}>{error.hairType}</p> }
					</div>
					<div>
						<select onChange={(e) => handleChange(e)} name="vaccines" id="">
							<option value="">Vacunas</option>
							<option value="true">Si</option>
							<option value="false">No</option>
						</select>
						{ error.vaccines && <p className={s.error}>{error.vaccines}</p> }
					</div>
					<div>
						<select onChange={(e) => handleChange(e)} name="castrated" id="">
							<option value="">Castrado</option>
							<option value="true">Si</option>
							<option value="false">No</option>
						</select>
						{ error.castrated && <p className={s.error}>{error.castrated}</p> }
					</div>
					<div>
						<select onChange={(e) => handleChange(e)} name="specialCare" id="">
							<option value="">Cuidados Especiales</option>
							<option value="true">Si</option>
							<option value="false">No</option>
						</select>
						{ error.specialCare && <p className={s.error}>{error.specialCare}</p> }
					</div>
					<div>
						<input onChange={(e) => handleChange(e)} name="image" type="file" accept="image/png, image/jpeg, image/jpg" />
						{ error.image && <p className={s.error}>{error.image}</p> }
					</div>
				</div>					
			</div>
		</div>
	)
}