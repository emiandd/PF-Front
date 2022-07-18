import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPay } from "../../redux/actions";
import { useNavigate } from 'react-router'
import { Link } from "react-router-dom";
import NavBar from "../../assets/NavBar/NavBar";
import Footer from "../../assets/Footer/Footer";
import s from '../../css/Donations.module.css'

export default function Donations() {
    let infoFundacion = localStorage.getItem('petDetail');
    infoFundacion = JSON.parse(infoFundacion)
    let idMascota = infoFundacion[0].id
    let infoUser = localStorage.getItem('user');
    infoUser = JSON.parse(infoUser)
    let { name } = infoUser.user
    let userId = localStorage.getItem('userId');
    userId = JSON.parse(userId)
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const linkPay = useSelector((state) => state.reducer.pay)
    const navigate = useNavigate()
    useEffect(() => {

    }, [dispatch])
    const preference = {
        items: [
            {
                title: "Donación para fundacion",
                quantity: 1,
                unit_price: parseInt(value.valor),
            }
        ],
        payer: {
            name: 'name',
            surname: 'lastname',
            email: 'test_user_83636644@testuser.com',
        },
        metadata: {
            fromUser: {
                id: 1,
                country: "PER",
                typeUser: 'user'
            },
            toUser: {
                id: 2,
                country: "PER",
                typeUser: 'user'
            }
        }
    }
    function handleChange(e) {
        e.preventDefault();
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }
    function handleClick(e) {
        e.preventDefault();
        dispatch(postPay(preference))
    }
    const linkPago = linkPay.urlPreferentialPayment
    
    return (
        <div>
            <NavBar />
            {linkPago?.length > 0 ? window.location.replace(`${linkPago}`) :
                <div className={s.content}>
                    <div className={s.component}>
                        
                        <div>
                            <h2>Que buena decisión {name}, estos animalitos...</h2>
                            <h3>Te necesitan!</h3>
                        </div>
                        <div className={s.donation}>
                            <p>Valor a donar:</p>
                            <input type='number' name="valor" onChange={handleChange} placeholder='💲'></input>
                            <button onClick={handleClick}>Pagar</button>
                        </div>
                    </div>

                            <button className={s.back} onClick={()=> navigate(`/pet-detail/${idMascota}`)}>Regresar</button>
 
                </div>
            }
           
        </div>
    )
}