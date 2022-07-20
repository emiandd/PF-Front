import axios from 'axios'
import { user } from '../assets/dataMockups/user.js'
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_CITIES_BY_COUNTRY = 'GET_CITIES_BY_COUNTRY';
export const CREATE_NEW_USER = 'CREATE_NEW_USER';
export const RESET_NEW_USER = 'RESET_NEW_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const RESET_USER_LOGGED = 'RESET_USER_LOGGED';
export const PATCH_USER = 'PATCH_USER';
export const CONFIRM_EMAIL = 'CONFIRM_EMAIL';
export const POST_PAY = 'POST_PAY';
export const PW_RESET = 'PW_RESET';
export const PW_CHANGE = 'PW_CHANGE';
export const EMAIL_CONFIRMED = 'EMAIL_CONFIRMED';
export const GET_DONATIONS = 'GET_DONATIONS';
const { REACT_APP_BACKEND_URL } = process.env; 



export function getUserInfo(id, token) {
    const url = `${REACT_APP_BACKEND_URL}/api/v1.0/user/${id}`
    const options = {
        method: 'GET',
        headers: { 'authorization': token },
    }
    return async function (dispatch) {

        return await fetch(url, options)
        .then(response => response.json())
        .then(data => {
            dispatch({ type: GET_USER_INFO, payload: data })
        })
    }
}

export function getCountries() {
    const url = `${REACT_APP_BACKEND_URL}/api/v1.0/countries`;
    return async function (dispatch) {
        return await fetch(url)
        .then(response => response.json())
        .then(data => {
            dispatch({ type: GET_COUNTRIES, payload: data })
        })
    }
}

export function getCitiesByCountry(id) {
    const url = `${REACT_APP_BACKEND_URL}/api/v1.0/cities/${id}`;
    return async function (dispatch) {
        return await axios.get(url)
        .then(data => {
            dispatch({ type: GET_CITIES_BY_COUNTRY, payload: data.data })
        })

    }

}

export function createNewUser(obj) {
    const url = `${REACT_APP_BACKEND_URL}/api/v1.0/user`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(obj)
    }
    return async function (dispatch) {
        return await fetch(url, options)
        .then(response => response.json())
        .then(data => {
            dispatch({ type: CREATE_NEW_USER, payload: data })
        })
    }
}

export function resetNewUser() {
    return { type: RESET_NEW_USER, payload: {} }
}


export function loginUser(obj) {
    const url = `${REACT_APP_BACKEND_URL}/api/v1.0/auth/userLogin`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(obj)
    }
    return async function (dispatch) {
        return await fetch(url, options)
        .then(response => response.json())
        .then(data => {
            dispatch({ type: LOGIN_USER, payload: data })
        })
    }
}

export function resetUserLogged() {
    return { type: RESET_USER_LOGGED, payload: {} }
}

export function patchUser(id, obj, token){
    const url = `${REACT_APP_BACKEND_URL}/api/v1.0/user/${id}`;
    const options = {
        method: 'PATCH',
        headers: { 'authorization': token,  'Content-Type': 'Application/json' },
        body: JSON.stringify(obj),
    }
    return async function (dispatch) {

        return await fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                dispatch({ type: PATCH_USER, payload: data })
            })
    }
}

export function sendEmailConfirm(obj){
    const url = `${REACT_APP_BACKEND_URL}/api/v1.0/verify`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(obj)
    }
    return async function (dispatch) {
        return await fetch(url, options)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: CONFIRM_EMAIL, payload: data})
            })
    }
}

export function emailConfirmed(tok){
	const url = `${REACT_APP_BACKEND_URL}/api/v1.0/verify/tk/${tok}`;
	return async function (dispatch) {
		return await fetch(url)
			.then(response => response.json())
			.then(data => {
				dispatch({ type: EMAIL_CONFIRMED, payload: data})
			})
	}
}

export function pwReset(obj){
    const url = `${REACT_APP_BACKEND_URL}/api/v1.0/verify/recpass`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(obj)
    }
    return async function (dispatch) {
        return await fetch(url, options)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: PW_RESET, payload: data})
            })
    }
}
export function pwChange(obj, tak){
    const url = `${REACT_APP_BACKEND_URL}/api/v1.0/verify/modpass/${tak}`;
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(obj)
    }
    return async function (dispatch) {
        return await fetch(url, options)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: PW_CHANGE, payload: data})
            })
    }
}

export function postPay(obj){
    const url = `${REACT_APP_BACKEND_URL}/api/v1.0/donations/urlPreferential`;
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'Application/json'},
        body: JSON.stringify(obj),
    }
    return async function (dispatch) {

        return await fetch(url, options)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: POST_PAY, payload: data })
            })
    }
}

export function getDonations(token){
    const url = `${REACT_APP_BACKEND_URL}/api/v1.0/donations`;
    const options = {
        method: 'GET',
        headers: { 'authorization': token },
    }
    return async function (dispatch) {

        return await fetch(url, options)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                dispatch({ type: GET_DONATIONS, payload: data })
            })
    }
}