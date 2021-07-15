import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'
import { Task2 } from '../Icons/Icons';

const LandingPage = () => {

    //Load carousel image
    const [img1, setImg1] = useState('')

    useEffect(()=>{
        setImg1('https://res.cloudinary.com/oyindacodes/image/upload/v1626092478/samples/glenn-carstens-peters-RLw-UC03Gwc-unsplash_adndsu.jpg');
    },[])

    const navBar = ()=>(
        <nav className={style.nav} >
            <h1>Todo</h1>
                <ul>
                    <Link to="/login">Login</Link>
                    <Link to="/signUp">SignUp</Link>
                </ul>
        </nav>
    )

    const backgroundCar = ()=>(
        <div className={style.car} >
            <div className={style.innerdiv}>
            <div className={style.heading} >
              <Task2 />
              <h1>Plan Your Todos</h1>
            </div>
            <p className={style.para} >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe sed dolores minima ipsam tempora quis eligendi quasi eius delectus, laborum cupiditate nisi beatae corporis accusamus ratione distinctio est deserunt, ea libero quaerat repellat reiciendis. Alias voluptate iste eaque temporibus iure?
            </p>
            </div>
        </div>
    )

    return (
        <div className={style.container} >
            {navBar()}
            {backgroundCar()}
        </div>
    )
}

export default LandingPage
