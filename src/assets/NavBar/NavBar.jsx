import React, { useEffect } from 'react';
import s from '../../css/NavBar.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Favorites } from '../Favoritos.svg';
import { resetUserLogged } from '../../redux/actions.js';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';


export default function NavBar() {

	const token = localStorage.getItem('token');
	const dispatch = useDispatch();
    const { loginWithRedirect, logout } = useAuth0();


	function closeSesion(){

		if(token){
			localStorage.removeItem('token');
			dispatch(resetUserLogged());
			return;
		}
	}

	function favs(e){
		e.preventDefault();
		const favAlert = alert('Debes iniciar sesión para ver tus favoritos');
		return favAlert;
	}

	return (
		<nav>
			<div className={s.navTop}>
				<div>
					<Link to='/'>
						<img src="https://i.postimg.cc/x8y022Hb/adoptame-logo-resplandor.png" alt="logo" className={s.logo} />
					</Link>
				</div>
				<div className={s.registerLogin}>
					<Link to='/favorites' onClick={ token ? '/favorites' : favs }>
						<Favorites className={s.favorites} />
					</Link>

					<Link to={token ? '/dashboard' : '/register' }>
						<p>{token ? 'Mi Perfil' : 'Registro'}</p>
					</Link>
					{/*<Link to={'/login'}>*/}
						<p onClick={() => loginWithRedirect()}>'Iniciar Sesión'</p>
					{/*</Link>*/}
						<p onClick={() => logout({returnTo: window.location.origin})}>'Cerrar Sesión'</p>
				</div>
			</div>
			<div className={s.navBottom}>
				<div className={s.links}>
					<Link to='/about-us'>
						<p>Acerca de Nosotros</p>
					</Link>|
					<Link to='/pet-care'>
						<p>Cuidado Animal</p>
					</Link>|
					<Link to='/donations'>
						<p>Donaciones</p>
					</Link>|
					<Link to='/faqs'>
						<p>FAQ's</p>
					</Link>
				</div>
			</div>

		</nav>
	)
}