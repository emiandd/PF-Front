import { useEffect, useState } from 'react';
import s from '../../css/Dashboard.module.css';
import NavBar from '../../assets/NavBar/NavBar'
import Footer from '../../assets/Footer/Footer'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { getCountries, getUserInfo, patchUser, getCitiesByCountry, getDonations } from '../../redux/actions';
import Spinner from '../../assets/Spinner/Spinner.js';


export default function Dashboard() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const cities = useSelector(state => state.reducer.citiesByCountry);
    const detail = useSelector((state) => state.reducer.userDetail)
    const dispatch = useDispatch()
    const { user, isAuthenticated, isLoading } = useAuth0();
    const patch = useSelector((state) => state.reducer.patch)
    localStorage.setItem('userDetail', JSON.stringify(detail));
    let userDetail = localStorage.getItem('userDetail');
    userDetail = JSON.parse(userDetail)
    const donations = useSelector(state => state.reducer.donations);
    localStorage.setItem('donations', JSON.stringify(donations));
    


    const [value, setValue] = useState({
    })

    useEffect(() => {
        dispatch(getUserInfo(userId, token))
        dispatch(getCountries())
        dispatch(getDonations(token))
        if (value.countryId === 'ARG'|| patch.country === 'Argentina') {
            dispatch(getCitiesByCountry('ARG')).then(() => {
                dispatch(patchUser(userId, value, token))
            })
        }
        if (value.countryId === 'CHL'|| patch.country === 'Chile') {
            dispatch(getCitiesByCountry('CHL')).then(() => {
                dispatch(patchUser(userId, value, token))
            })
        }
        if (value.countryId === 'COL'|| patch.country === 'Colombia') {
            dispatch(getCitiesByCountry('COL')).then(() => {
                dispatch(patchUser(userId, value, token))
            })
        }
        if (value.countryId === 'ECU'|| patch.country === 'Ecuador') {
            dispatch(getCitiesByCountry('ECU')).then(() => {
                dispatch(patchUser(userId, value, token))
            })
        }
        if (value.countryId === 'PER'|| patch.country == 'Peru') {
            dispatch(getCitiesByCountry('PER')).then(() => {
                dispatch(patchUser(userId, value, token))
            })
        }
        document.body.style.overflow = 'visible';

    }, [dispatch, value])

    function handleValue(e) {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }


    function handleBlur(e) {
        e.preventDefault(e) 
        if (e.target.blur) {
            dispatch(patchUser(userId, value, token))
                .then(() => {
                    dispatch(getUserInfo(userId, token))
                })
                .then(() => {
                    dispatch(getCitiesByCountry(detail.country))
                })

        }
    }

    function handleSelect(e) {
        e.preventDefault(e)
        dispatch(patchUser(userId, value, token))
            .then(() => {
                dispatch(getUserInfo(userId, token))
            })
            .then(() => {
                dispatch(getCitiesByCountry(detail.country))
            })
        return cities;
    }
    const countryEstado = useSelector((state) => state.reducer.countries)
    return (
        <div>
            <NavBar />
                { Object.keys(userDetail).length > 0 ?
                <div className={s.content}>
                    <h1>Mi Dashboard</h1>
                    <div className={s.dash}>
                        <div className={s.datos}>
                            <div className={s.selected}>
                                <h3>Sobre Mí</h3>
                            </div>
                            <div className={s.nonSelected}>
                                <Link className={s.link} to='/dashboard/mascotas'><h3>Mis Mascotas</h3></Link>
                            </div>
                            {userDetail?.role === 'user'?
                            <div className={s.nonSelected}>
                                <Link className={s.link} to='/dashboard/adoptante'><h3>Perfil Adoptante</h3></Link>
                            </div>
                            :null}
                            <div className={s.nonSelected}>
                                {userDetail.role === 'fundation'?
                            <Link className={s.link} to='/dashboard/foundation'><h3>Donaciones  Recibidas</h3></Link>:
                            <Link className={s.link} to='/dashboard/donations'><h3>Donaciones  Realizadas</h3></Link>
                                }
                            </div>
                        </div>
                        <div className={s.infoContainer}>
                            <h2>Información Personal</h2>
                            <div className={s.inputContainer}>
                                <div className={s.left}>
                                    <div className={s.name}>
                                        <h4>Nombres</h4>
                                        <input onChange={(e) => handleValue(e)} onBlur={(e) => handleBlur(e)} name="name" value={value.name ? value.name : ` ${userDetail.name}`} type="text" />
                                    </div>
                                    <div className={s.name}>
                                        <h4>Teléfono</h4>
                                        <input onChange={(e) => handleValue(e)} onBlur={(e) => handleBlur(e)} name="phone" value={value.phone ? value.phone : ` ${userDetail.phone ? userDetail.phone : ' '}`} type="text" />
                                    </div>
                                    <div className={s.name}>
                                        <h4>País</h4>
                                        <select value={value.countryId ? value.countryId : userDetail.country} name="countryId" onSelect={handleSelect} onChange={(e) => handleValue(e)}  >
                                        <option value={patch.country ? patch.country : userDetail.country}>{patch.country ? patch.country : userDetail.country}</option>
                                            {countryEstado && countryEstado.map((c,index) =>
                                                <option key={index} value={c.id}>{c.name}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className={s.right}>
                                    <div className={s.apellido}>
                                        <h4>Apellidos</h4>
                                        <input onChange={(e) => handleValue(e)} onBlur={(e) => handleBlur(e)} name='lastName' value={value.lastName ? value.lastName : ` ${userDetail.lastName}`} type="text" />
                                    </div>
                                    <div className={s.apellido}>
                                        <h4>Email</h4>
                                        <input value={userDetail.email} type="text" />
                                    </div>
                                    <div className={s.apellido}>
                                        <h4>Ciudad</h4>
                                        <select value={value.cityId ? value.cityId : userDetail.city} name="cityId" onSelect={handleSelect} onChange={(e) => handleValue(e)} >
                                            <option value={patch.city ? patch.city : userDetail.city}>{patch.city ? patch.city : userDetail.city}</option>
                                            {cities.length > 0 ?  cities?.map((c, index) =>
                                                <option key={index} value={c.id}>{c.name}</option>
                                            ):
                                            null}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <Link to='/create-pet' className={s.link}>
                                <button className={s.button}>Agregar Mascota</button>
                            </Link>
                        </div>
                    </div>
                <Footer />  
                </div>
                : <Spinner />}
        </div>
    )
}