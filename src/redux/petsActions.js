import axios from 'axios'
import { InfoApi } from "../assets/dataMockups/InfoApi.js";
// import { user } from '../assets/dataMockups/user.js'
export const RESET_PET_ORDER = 'RESET_PET_ORDER'
export const BREED_FILTER = 'BREED_FILTER'
export const AGE_FILTER = 'AGE_FILTER'
export const SIZE_FILTER = 'SIZE_FILTER'
export const GENRE_FILTER = 'GENRE_FILTER'
export const ENVIRONMENT_FILTER = 'ENVIRONMENT_FILTER'
export const COAT_FILTER = 'COAT_FILTER'
export const COLOR_FILTER = 'COLOR_FILTER'
export const ATTRIBUTES_FILTER = 'ATTRIBUTES_FILTER'
export const DAYS_FILTER = 'DAYS_FILTER'
export const SHELTER_FILTER = 'SHELTER_FILTER'
export const CITY_FILTER = 'CITY_FILTER'
export const RESET_SEARCH = 'RESET_SEARCH'
export const TYPE_FILTER = 'TYPE_FILTER'
export const RESET_PET_DETAIL = 'RESET_PET_DETAIL'
export const GET_ALL_PETS = 'GET_ALL_PETS'
export const GET_DETAIL = 'GET_DETAIL'



export function getAllPets() {
  return async function (dispatch) {
      // var json = await axios.get('http://localhost:3001');
      return dispatch({
          type: GET_ALL_PETS,
          payload: InfoApi
      })
  }
}

export function getDetail(id) {
  return async function (dispatch) {
      var pets = await axios.get('https://pf-api-pets.herokuapp.com/api/v1.0/deploy');
      const filter = pets.data.animals.filter(el => el.id == id)
      return dispatch({

          type: 'GET_DETAIL',
          payload: filter

      })
  }
}

// SEARCHER FILTERS ------------------------------

export const breedFilter = (value) => {
  return {
      type: BREED_FILTER,
      payload: value
  }
}

export const ageFilter = (value) => {
  return {
      type: AGE_FILTER,
      payload: value
  }
}

export const sizeFilter = (value) => {
  return {
      type: SIZE_FILTER,
      payload: value
  }
}

export const genreFilter = (value) => {
  return {
      type: GENRE_FILTER,
      payload: value
  }
}

export const environmentFilter = (value) => {
  return {
      type: ENVIRONMENT_FILTER,
      payload: value
  }
}
export const coatFilter = (value) => {
  return {
      type: COAT_FILTER,
      payload: value
  }
}
export const colorFilter = (value) => {
  return {
      type: COLOR_FILTER,
      payload: value
  }
}
export const attributesFilter = (value) => {
  return {
      type: ATTRIBUTES_FILTER,
      payload: value
  }
}
export const daysFilter = (value) => {
  return {
      type: DAYS_FILTER,
      payload: value
  }
}

export const shelterFilter = (value)=>{
  return {
      type: SHELTER_FILTER,
      payload: value
  }
}

//------------------------------------------------


export const typeFilter = (type) => {
  let url = 'https://pf-api-pets.herokuapp.com/api/v1.0/deploy'

  return async function (dispatch) {
      try {
          let response = await axios.get(url);
          const data = response.data.animals
          // console.log(data)
          const json = data.filter(e => e.type === type);
          return dispatch({
              type: TYPE_FILTER,
              payload: json,
          })
      } catch (error) {
          console.log(error);
      }
  }
}


export function cityFilter(obj) {
  let url = 'https://pf-api-pets.herokuapp.com/api/v1.0/deploy'
  return async function (dispatch) {
      return await fetch(url)
          .then(res => res.json())
          .then(json => {
              let filtered = json.animals.filter(el => el.contact.address.city.toLowerCase() === obj.city)
              dispatch({ type: CITY_FILTER, payload: filtered })
          })
          .catch(error => console.log(error))
  }
}

export const resetSearch = () => {
  return {
      type: RESET_SEARCH,
  }
}

export const resetPetOrder = (orderType) => {
  return {
      type: RESET_PET_ORDER,
      payload: orderType
  }
}


export function resetPetDetail() {
  return { type: RESET_PET_DETAIL, payload: {} }
}