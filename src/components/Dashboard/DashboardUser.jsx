import { useEffect } from 'react'
import s from '../../css/DashboardUser.module.css';
import NavBar from '../../assets/NavBar/NavBar'
import Footer from '../../assets/Footer/Footer'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPetsByUser, resetDashboardPets } from '../../redux/actions';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../../assets/Spinner/Spinner.js';

export default function Dashboard() {

    const dispatch = useDispatch()
    const pets = useSelector(state => state.reducer.allPetsByUser)
    let userDetail = localStorage.getItem('userDetail');
    let auth0User = localStorage.getItem('loginAuth');
    auth0User = JSON.parse(auth0User)
    let userId = localStorage.getItem('userId') || auth0User.user.id;
    userDetail = JSON.parse(userDetail) || auth0User;
    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        dispatch(getAllPetsByUser(Number(userId)))
        window.scrollTo(0,0)
        
        return ()=>{
            dispatch(resetDashboardPets())
        }
    }, [dispatch])
    
    return (
        <div>
            <NavBar />
            <div className={s.content}>
                <h1>Mi Dashboard</h1>
                <div className={s.dash}>
                    <div className={s.datos}>
                        <Link className={s.link} to={ isAuthenticated ? '/dashboard/auth0' : '/dashboard' }><div className={s.nonSelected}>
                            <h3>Sobre Mí</h3>
                        </div></Link>
                        <div className={s.selected}>
                            <h3>Mis Mascotas</h3>
                        </div>
                        {userDetail.role === 'user'?
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
                        <h2>Mis Mascotas</h2>
                        <div className={s.inputContainer}>
                            <div className={s.detailsOptions1}>
                                <div>
                                    <p className={s.img}>Imagen</p>
                                </div>
                                <div>
                                    <p className={s.p}>Nombre</p>
                                </div>
                                <div>
                                    <p className={s.p}>Tipo</p>
                                </div>
                                {/* <div>
                                    <p className={s.p}>Estado</p>
                                </div> */}
                                <div>
                                    <p className={s.p}>Fecha</p>
                                </div>
                            </div>
                            {pets?.length >= 1 ? pets.map((el, index) => {
                                return (
                                    <Link to={`/pet-detail/${el.id}`} key={index} className={s.link} >
                                        <div key={index} className={index % 2 === 1 ? s.detailsOptions : s.detailsOptionsColors}>
                                            <div className={s.detailImg}>
                                                <img src={el.photos[0]?.option_1} />
                                            </div>
                                            <div>
                                                <p className={s.p}>{el.name}</p>
                                            </div>
                                            <div>
                                                <p className={s.p}>{el.type}</p>
                                            </div>
                                            <div>
                                                <p className={s.p}>{el.published_at.split('T')[0]}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }):
                            <Spinner  message={'No tienes mascotas en adopción'} />}
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
