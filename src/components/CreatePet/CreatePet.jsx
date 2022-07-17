import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import NavBar from '../../assets/NavBar/NavBar';
import Footer from '../../assets/Footer/Footer';
import s from '../../css/CreatePet.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPet, getBreedsByPetType } from '../../redux/petsActions.js';
import { catColors } from './petColors.js';

export default function CreatePet() {

	const dispatch = useDispatch();
	let user = localStorage.getItem('user');
	user = JSON.parse(user);
	const userId = user.user.id;
	const breeds = useSelector( state => state.petsReducer.breedsByPetType )

	const { register,
			handleSubmit, 
			formState: { errors }, 
			watch } = useForm();

	const petType = watch("typeId");
	console.log(petType);

	const onSubmit = async data => {

		data.userId = userId;
		data.status = "adoptable";

		if(data.castrated === 'true')data.castrated = true;
		else if(data.castrated === 'false')data.castrated = false;

		if(typeof data.breedId === 'string')data.breedId = parseInt(data.breedId);

		/* ATTRIBUTES */

		if(data.house_trained === 'true') data.house_trained = true;
		else if(data.house_trained === 'false') data.house_trained = false;
		if(data.special_needs === 'true') data.special_needs = true;
		else if(data.special_needs === 'false')data.special_needs = false;
		data.attributes = {
			house_trained: data.house_trained,
			special_needs: data.special_needs
		}

		/* ENVIRONMENT */

		if(data.children === '') data.children = null;
		else if(data.children === 'true') data.children = true;
		else if(data.house_trained === 'false') data.children = false;

		if(data.dogs === '') data.dogs = null;
		else if(data.dogs === 'true') data.dogs = true;
		else if (data.dogs === 'false') data.dogs = false;

		if(data.cats === '') data.cats = null;
		else if(data.cats === 'true') data.cats = true;
		else if (data.cats === 'false') data.cats = false;

		data.environment = {
			children: data.children,
			dogs: data.dogs,
			cats: data.cats
		}
		console.log(data);

		// dispatch(createNewPet(data));
	}

	useEffect(() => {

		if(petType){
			dispatch(getBreedsByPetType(petType));
		}

	}, [petType])
	
	console.log(errors);
	
	return (
		<div>
			<NavBar />
			<div className={s.container}>
				<div className={s.left}>
					<div className={s.overflow}></div>
				</div>
				<div className={s.right}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<h1>Crear Mascota</h1>
						<div>
							<select {...register("typeId", { required: "Selecciona un tipo de mascota" })}>
								<option value="" disabled selected hidden>Tipo</option>
								<option value="gato">Gato</option>
								<option value="perro">Perro</option>
							</select>
							{ errors?.typeId && <p className={s.error}>{errors.typeId.message}</p> }
						</div>

						<div>
							<select {...register("breedId", {required: "Selecciona un tipo de raza"})}>
								<option value="" disabled selected hidden>Raza</option>
									{breeds && breeds.map( b =>  
										<option value={b.id}>{b.nameBreed}</option>
									)}
							</select>
							{ errors?.breedId && <p className={s.error}>{errors.breedId.message}</p> }
						</div>
						<div>
							<select  {...register("age", { required: "Selecciona una edad" })}>
								<option value="" disabled selected hidden>Edad</option>
								<option value="cachorro">Cachorro</option>
								<option value="joven">Joven</option>
								<option value="adulto">Adulto</option>
								<option value="adulto mayor">Adulto Mayor</option>
							</select>
							{ errors?.age && <p className={s.error}>{errors.age.message}</p> }
						</div>
						<div>
							<input {...register("name", { 
										required: "Debes ingresar un nombre",
										maxLength: {
											value: 20,
											message: "El nombre no puede contener más de 20 caracteres"
										}
										 })} placeholder="Nombre de tu mascota" />
										
							{ errors?.name && <p className={s.error}>{errors.name.message}</p> }
						</div>
						<div>
							<select {...register("gender", { required: "Selecciona un género" })}>
								<option value="" disabled selected hidden>Género</option>
								<option value="macho">Macho</option>
								<option value="hembra">Hembra</option>
							</select>
							{ errors?.gender && <p className={s.error}>{errors.gender.message}</p> }
						</div>
						<div>
							<select {...register("size", { required: "Selecciona un tamaño" })}>
								<option value="" disabled selected hidden>Tamaño</option>
								<option value="pequeño">Pequeño</option>
								<option value="mediano">Mediano</option>
								<option value="grande">Grande</option>
								<option value="extra grande">Extra Grande</option>
							</select>
							{ errors?.size && <p className={s.error}>{errors.size.message}</p> }
						</div>
						<div>
							<select {...register("colorId", { required: "Selecciona un color" })}>
								<option value="" disabled selected hidden>Color</option>
									<option value="negro">Negro</option>
									{/*{ petType && petType === 'gato' ? catColors.map( c => 
										return (<option value={c}>{c}</option>)
									)}*/}
							</select>
							{ errors?.colorId && <p className={s.error}>{errors.colorId.message}</p> }
						</div>
						<div>
							<select {...register("coat", { required: "error en este input" })}>
								<option value="" disabled selected hidden>Tipo de Pelo</option>
								<option value="sin pelo">Sin Pelo</option>
								<option value="corto">Corto</option>
								<option value="mediano">Medio</option>
								<option value="largo">Largo</option>
								<option value="ondulado">Ondulado</option>
								<option value="rizado">Rizado</option>
							</select>
							{ errors?.coat && <p className={s.error}>{errors.coat.message}</p> }
						</div>
						<div>
							<select {...register("health", { required: "error en este input" })}>
								<option value="" disabled selected hidden>Vacunas</option>
								<option value="vacunas al dia">Vacunas al día</option>
								<option value="sin vacunas">Sin vacunas</option>
							</select>
							{ errors?.health && <p className={s.error}>{errors.health.message}</p> }
						</div>
						<div id="tags">
							<select multiple {...register("tags")}>
								<option value="amigable">Amigable</option>
								<option value="carinoso">Cariñoso</option>
							</select>
						</div>
						<div>
							<select {...register("castrated", { required: "error en este input" })}>
								<option value="" disabled selected hidden>Castrado</option>
								<option value="true">Si</option>
								<option value="false">No</option>
							</select>
							{ errors?.castrated && <p className={s.error}>{errors.castrated.message}</p> }
						</div>
						<div id="attributes">
							<div id="attributes_house_trained">Atributos
								<select {...register("house_trained", { required: "error en este input" })}>
									<option value="" disabled selected hidden>Entrenado en Casa</option>
									<option value="true">Si</option>
									<option value="false">No</option>
								</select>
								{ errors?.house_trained && <p className={s.error}>{errors.house_trained.message}</p> }
							</div>
							<div>
								<select {...register("special_needs", { required: "error en este input" })}>
									<option value="" disabled selected hidden>Cuidados Especiales</option>
									<option value="true">Si</option>
									<option value="false">No</option>
								</select>
								{ errors?.special_needs && <p className={s.error}>{errors.special_needs.message}</p> }
							</div>
						</div>
						<div id="environment">
							<div id="environment_children">Entorno
								<select {...register("children")}>
									<option value="">Niños</option>
									<option value="true">Si</option>
									<option value="false">No</option>
								</select>
								{ errors?.children && <p className={s.error}>{errors.children.message}</p> }
							</div>
							<div>
								<select {...register("dogs")}>
									<option value="">Perros</option>
									<option value="true">Si</option>
									<option value="false">No</option>
								</select>
								{ errors?.dogs && <p className={s.error}>{errors.dogs.message}</p> }
							</div>
							<div>
								<select {...register("cats")}>
									<option value="">Gatos</option>
									<option value="true">Si</option>
									<option value="false">No</option>
								</select>
								{ errors?.cats && <p className={s.error}>{errors.cats.message}</p> }
							</div>
						</div>
						<div>
      						<input {...register("photos", { required: "Debes cargar al menos una foto de tu mascota" })}
      							   type="file"
      							   id="photos"
      							   accept="image/png, image/jpeg, image/jpg"
      							   multiple />
      						{ errors?.photos && <p className={s.error}>{errors.photos.message}</p> }
						</div>	
						<div id="textarea">
							<textarea {...register("description", { 
											required: "Debes ingresar una descripción de tu mascota", 
											minLength: {
												value: 100,
												message: "Ingresa minimo 100 caracteres"
											}
							})}
							placeholder="Ingresa una breve descripción de tu mascota"/>
							{ errors?.description && <p className={s.error}>{errors.description.message}</p> }
						</div>
						
						<button type='submit'>Crear Mascota</button>
					</form>
				</div>					
			</div>
			<Footer />
		</div>
	)
}