import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import style from './Login.module.css';
import { signIn, authenticate, isAuthenticated, searchCountry, signOut } from '../API_endpoints'

const Login = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        redirectToReferrer: false
    })

    const { email, password, error, redirectToReferrer } = values;

    const { user } = isAuthenticated()


    const handleChange = (name)=>e=>{
        setValues({...values, [name]:e.target.value, error:false})
    }

    const submit = (e)=>{
        e.preventDefault();
        setValues({...values, error:false})
        signIn({email,password})
         .then(data=>{
             if(data.error){
                 setValues({...values, error:data.error})
             }else{
                 authenticate(data,()=>{
                     setValues({...values,redirectToReferrer:true})
                 })
             }
         });
    }


    const showError = ()=>(
        <div className="alert alert-danger w-75 m-auto mt-5 " style={{ display: error? 'block':'none' }} >
            {error}
        </div>
    )


    const redirectUser = ()=>{
        if(redirectToReferrer){
            if(user){
                return <Redirect to="/task/dashboard" />
            }
        }
    }


    const form = ()=>(
        <form onSubmit={submit} className={style.form} >
            <h1>Login</h1>
            <input type='text' onChange={handleChange('email')} value={email} placeholder="Enter email" />
            <input type='password' onChange={handleChange('password')} value={password} placeholder="Enter password" />
            <input type="submit" value="Login" />
            <span className={style.span}>
                Dont't have an account?<Link to="/signUp" >{" "}Sign Up</Link>
            </span>
        </form>
    );

    return (
        <div className={style.container} >
            {redirectUser()}
            {showError()}
            {form()}
        </div>
    )
}

export default Login
