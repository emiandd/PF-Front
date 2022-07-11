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
	// ENVIRONMENT_FILTER,
	// COAT_FILTER,
	// COLOR_FILTER,
	// ATTRIBUTES_FILTER,
	// DAYS_FILTER,
	// SHELTER_FILTER
	RESET_FILTER_CARD,
	GET_USER_INFO,
	GET_COUNTRIES,
	GET_CITIES_BY_COUNTRY,
	CREATE_NEW_USER,
	RESET_NEW_USER
} from './actions';

const initialState = {
	allPets: [],
	petDetail: {},
	petsByType: [],
	petsFiltered: [],
	newUser: {},
	userDetail: {},
	userLogged: {},
	filterActive: [],
	countries: [],
	citiesByCountry: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_PETS:
			return {
				...state,
				allPets: action.payload,
				petsFiltered: action.payload,
			}
		case GET_DETAIL:
			return {
				...state,
				petDetail: action.payload,
			}
		// SEARCHER FILTERS
		case BREED_FILTER:
			return {
				...state,
				petsFiltered: state.petsByType.filter(e => e.breeds.primary === action.payload),
				// filterActive: state.filterActive.filter(e => e === 'Raza').length < 1 ? [...state.filterActive, 'Raza'] : state.filterActive
				filterActive: ['Raza']
			}
		case AGE_FILTER:
			return {
				...state,
				petsFiltered: state.petsByType.filter(e => e.age === action.payload),
				// filterActive: state.filterActive.filter(e => e === 'Edad').length < 1 ? [...state.filterActive, 'Edad'] : state.filterActive
				filterActive: ['Edad']
			}
		case SIZE_FILTER:
			return {
				...state,
				petsFiltered: state.petsByType.filter(e => e.size === action.payload),
				// filterActive: state.filterActive.filter(e => e === 'Tamaño').length < 1 ? [...state.filterActive, 'Tamaño'] : state.filterActive
				filterActive: ['Tamaño']
			}
		case GENRE_FILTER:
			return {
				...state,
				petsFiltered: state.petsByType.filter(e => e.gender === action.payload),
				// filterActive: state.filterActive.filter(e => e === 'Sexo').length < 1 ? [...state.filterActive, 'Sexo'] : state.filterActive
				filterActive: ['Sexo']
			}
		// RESET FILTERS
		case RESET_PET_ORDER:
			return {
				...state,
				petsFiltered: state.petsByType,
				filterActive: state.filterActive.filter(e => e !== action.payload)
			}
		case RESET_FILTER_CARD:
			return {
				...state,
				filterActive: []
			}
		case TYPE_FILTER:
			return {
				...state,
				petsFiltered: action.payload,
				petsByType: action.payload
			}
		case RESET_PET_DETAIL:
			return{
				...state,
				petDetail: action.payload,
			}
		case GET_USER_INFO:
			return{
				...state,
				userDetail: action.payload,
			}

		case GET_COUNTRIES:
			return{
				...state,
				countries: action.payload
			}

		case GET_CITIES_BY_COUNTRY:
			return{
				...state,
				citiesByCountry: action.payload
			}

		case CREATE_NEW_USER:
			return{
				...state,
				newUser: action.payload
			}

		case RESET_NEW_USER:
			return{
				...state,
				newUser: action.payload
			}			

		default:
			return state;
	}
}
