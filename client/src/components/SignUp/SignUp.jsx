import React, { useState } from 'react'
import style from './SignUp.module.css';
import { Link } from 'react-router-dom'
import { signUp, authenticate } from '../API_endpoints';

const SignUp = () => {

    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: "",
        age: "",
        error: "",
        success: false
    })

    const { fullname, email, password, age, error, success } = user;


    const handleChange = (name)=>e=>{
        setUser({ ...user, [name]: e.target.value, error:"" });
    }


    const submit = (e)=>{
        e.preventDefault()
        setUser({...user, error: false})
        signUp({fullname, password,age,email})
        .then(data=>{
            if(data.error){
                setUser({...user, error:data.error,success:false})
            }else{
                setUser({...user, fullname:"", password:"", age:"", email:"", success:true })
            }
        })
    }

    const showSuccess = ()=>(
        <div className="alert alert-info w-75 m-auto mt-5" style={{ display: success? 'block':'none'}} >
            New Account is created. Please <Link to="/login" style={{ textDecoration:'none' }} >Login</Link>
        </div>
    )


    const showError = ()=>(
        <div className="alert alert-danger w-75 m-auto mt-5 " style={{ display: error? 'block':'none'}} >
            {error}
        </div>
    )

    const form = ()=>(
        <form onSubmit={submit} className={style.form} >
            <h1>SignUp</h1>
            <input onChange={handleChange('fullname')} value={fullname} type='text' placeholder="Enter fullname" />
            <input onChange={handleChange('email')} value={email} type='text' placeholder="Enter email" />
            <input onChange={handleChange('password')} value={password} type='password' placeholder="Enter password" />
            <input onChange={handleChange('age')} value={age} type='number' placeholder="Enter age" />
            <input type="submit" value="Sign Up" />
            <span className={style.span}>
                Have an account?<Link to="/login" >{" "}login</Link>
            </span>
        </form>
    )


    return (
        <div className={style.container}>
            {showSuccess()}
            {showError()}
            {form()}
        </div>
    )
}

export default SignUp
