import { foundations } from '../constants/organizations/spanishOrganizations'

import {
	RESET_PET_DETAIL,
	GET_ALL_PETS,
	GET_DETAIL,
	TYPE_FILTER,
	BREED_FILTER,
	RESET_PET_ORDER,
	AGE_FILTER,
	SIZE_FILTER,
	GENRE_FILTER,
	ENVIRONMENT_FILTER,
	COAT_FILTER,
	COLOR_FILTER,
	ATTRIBUTES_FILTER,
	DAYS_FILTER,
	SHELTER_FILTER,
	CITY_FILTER,
	RESET_SEARCH,
	CREATE_NEW_PET,
	BREEDS_BY_PET_TYPE,
	COLORS_BY_PET_TYPE,
	GET_FAV_PETS,
	POST_FAV_PET,
	DELETE_FAV_PET,
	GET_ALL_PETS_AND_FAVS,
	SEARCH_IN_FAVS,
	UPDATE_PET_BY_ID,
	RESET_UPDATE_MSG,
	GET_PET_DETAIL_FAV,
	RESERT_SEARCH
} from './petsActions';


const initialState = {
	allPets: [],
	petDetail: {},
	petsAvailables: [],
	petsFiltered: [],
	filterActive: [],
	filterDisplayed: [],
	createNewPet: {},
	breedsByPetType: [],
	colorsByPetType: [],
	petsFavs: [],
	petUpdated: {},
	petDetailFav: []
};

export default function petsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_PETS:
			return {
				...state,
				allPets: action.payload,
			}
		case GET_DETAIL:
			return {
				...state,
				petDetail: action.payload,
			}
		case GET_FAV_PETS:
			return {
				...state,
				petsFavs: action.payload
			}
		case POST_FAV_PET:
			return {
				...state,
				petsFavs: [...state.petsFavs, action.payload]
			}
		case DELETE_FAV_PET:
			return {
				...state,
				petsFavs: state.petsFavs.filter(e => e.id !== action.payload)
			}
		case GET_ALL_PETS_AND_FAVS:
			return {
				...state,
				petsAvailables: action.payload,
				allPets: action.payload
			}
		case SEARCH_IN_FAVS:
			return {
				...state,
				petsAvailables: action.payload,
				petsFiltered: action.payload
			}
		case GET_PET_DETAIL_FAV:
			return {
				...state,
				petDetailFav: action.payload
			}

		// SEARCHER FILTERS
		case BREED_FILTER:
			return {
				...state,
				petsFiltered: state.filterActive[0] === "Raza" ? state.petsAvailables.filter(e => e.breed === action.payload) : state.petsFiltered.filter(e => e.breed === action.payload),
				filterActive: state.filterActive.filter(e => e === 'Raza').length < 1 ? [...state.filterActive, 'Raza'] : state.filterActive,
				filterDisplayed: state.filterActive[0] === "Raza" ? [action.payload] : [...state.filterDisplayed, action.payload]
			}
		case AGE_FILTER:
			return {
				...state,
				petsFiltered: state.filterActive[0] === 'Edad' ? state.petsAvailables.filter(e => e.age === action.payload) : state.petsFiltered.filter(e => e.age === action.payload),
				filterActive: state.filterActive.filter(e => e === 'Edad').length < 1 ? [...state.filterActive, 'Edad'] : state.filterActive,
				filterDisplayed: state.filterActive[0] === "Edad" ? [action.payload] : [...state.filterDisplayed, action.payload]
			}

		case SIZE_FILTER:

			return {
				...state,
				petsFiltered: state.filterActive[0] === 'Tamaño' ? state.petsAvailables.filter(e => e.size.split(' ')[0] === action.payload) : state.petsFiltered.filter(e => e.size.split(' ')[0] === action.payload),
				filterActive: state.filterActive.filter(e => e === 'Tamaño').length < 1 ? [...state.filterActive, 'Tamaño'] : state.filterActive,
				filterDisplayed: state.filterActive[0] === "Tamaño" ? [action.payload] : [...state.filterDisplayed, action.payload]
			}

		case GENRE_FILTER:
			return {
				...state,
				petsFiltered: state.filterActive[0] === "Sexo" ? state.petsAvailables.filter(e => e.gender === action.payload) : state.petsFiltered.filter(e => e.gender === action.payload),
				filterActive: state.filterActive.filter(e => e === 'Sexo').length < 1 ? [...state.filterActive, 'Sexo'] : state.filterActive,
				filterDisplayed: state.filterActive[0] === "Sexo" ? [action.payload] : [...state.filterDisplayed, action.payload]
			}

		case ENVIRONMENT_FILTER:

			const enviromentDisplayed = action.payload === 'dogs' ? 'Perros' : action.payload === 'cats' ? 'Gatos' : 'Niños'

			return {
				...state,
				petsFiltered: state.filterActive[0] === 'Afinidad Con' ? state.petsAvailables.filter(e => e.environment[`${action.payload}`] === true) : state.petsFiltered.filter(e => e.environment[`${action.payload}`] === true),
				filterActive: state.filterActive.filter(e => e === 'Afinidad Con').length < 1 ? [...state.filterActive, 'Afinidad Con'] : state.filterActive,
				filterDisplayed: state.filterActive[0] === "Afinidad Con" ? [enviromentDisplayed] : [...state.filterDisplayed, enviromentDisplayed]
			}

		case COAT_FILTER:
			return {
				...state,
				petsFiltered: state.filterActive[0] === "Pelaje" ? state.petsAvailables.filter(e => e.coat === action.payload) : state.petsFiltered.filter(e => e.coat === action.payload),
				filterActive: state.filterActive.filter(e => e === 'Pelaje').length < 1 ? [...state.filterActive, 'Pelaje'] : state.filterActive,
				filterDisplayed: state.filterActive[0] === "Pelaje" ? [action.payload] : [...state.filterDisplayed, action.payload]
			}

		case COLOR_FILTER:
			return {
				...state,
				petsFiltered: state.filterActive[0] === "Color" ? state.petsAvailables.filter(e => e.color.toLowerCase() === action.payload.toLowerCase()) : state.petsFiltered.filter(e => e.color.toLowerCase() === action.payload.toLowerCase()),
				filterActive: state.filterActive.filter(e => e === 'Color').length < 1 ? [...state.filterActive, 'Color'] : state.filterActive,
				filterDisplayed: state.filterActive[0] === "Color" ? [action.payload] : [...state.filterDisplayed, action.payload]
			}

		case ATTRIBUTES_FILTER:

			let attributeDisplated = action.payload.toLowerCase() === 'house_trained' ? 'Hogareño' : 'Cuidados Especiales'


			return {
				...state,
				petsFiltered: state.filterActive[0] === "Cuidado y Comportamiento" ? state.petsAvailables.filter(e => e.attributes[`${action.payload}`] === true) : state.petsFiltered.filter(e => e.attributes[`${action.payload}`] === true),
				filterActive: state.filterActive.filter(e => e === 'Cuidado y Comportamiento').length < 1 ? [...state.filterActive, 'Cuidado y Comportamiento'] : state.filterActive,
				filterDisplayed: state.filterActive[0] === "Cuidado y Comportamiento" ? [attributeDisplated] : [...state.filterDisplayed, attributeDisplated]
			}
		case DAYS_FILTER:

			const petsIteratedByDays = state.filterActive[0] === "Tiempo en Adopción" ? state.petsAvailables : state.petsFiltered

			return {
				...state,
				petsFiltered: petsIteratedByDays.sort((a, b) => {
					if (action.payload === 'older') {
						return a.status_changed_at - b.status_changed_at
					} else {
						return b.status_changed_at - a.status_changed_at
					}
				}),
				filterActive: state.filterActive.filter(e => e === 'Tiempo en Adopción').length < 1 ? [...state.filterActive, 'Tiempo en Adopción'] : state.filterActive,
				filterDisplayed: state.filterActive[0] === "Tiempo en Adopción" ? [action.payload] : [...state.filterDisplayed, action.payload]
			}


		case SHELTER_FILTER:

			const petsIteratedByShelter = state.filterActive[0] === "Refugios" ? state.petsAvailables : state.petsFiltered

			return {
				...state,
				petsFiltered: petsIteratedByShelter.filter(e => e.contact.name === action.payload),
				filterActive: state.filterActive.filter(e => e === 'Refugios').length < 1 ? [...state.filterActive, 'Refugios'] : state.filterActive,
				filterDisplayed: state.filterActive[0] === "Refugios" ? [action.payload] : [...state.filterDisplayed, action.payload]
			}


		// GETS BY CITY OR TYPE
		case TYPE_FILTER:
			return {
				...state,
				petsAvailables: action.payload,
				petsFiltered: action.payload
			}
		case CITY_FILTER:
			return {
				...state,
				petsAvailables: action.payload,
				petsFiltered: action.payload
			}

		// RESET FILTERS

		case RESET_PET_ORDER:
			return {
				...state,
				petsFiltered: state.petsAvailables,
				filterActive: [],
				filterDisplayed: []
			}

		case RESET_PET_DETAIL:
			return {
				...state,
				petDetail: action.payload,
			}
		case RESET_SEARCH:
			return {
				...state,
				petsAvailables: [],
				petsFiltered: [],
				filterActive: [],
				filterDisplayed: []
			}

		case CREATE_NEW_PET:
			return {
				...state,
				createNewPet: action.payload
			}

		case BREEDS_BY_PET_TYPE:
			return {
				...state,
				breedsByPetType: action.payload
			}

		case COLORS_BY_PET_TYPE:
			return {
				...state,
				colorsByPetType: action.payload
			}

		case UPDATE_PET_BY_ID:
			return {
				...state,
				petUpdated: action.payload
			}

		case RESET_UPDATE_MSG:
			return {
				...state,
				petUpdated: action.payload
			}

		default:
			return state;
	}
}