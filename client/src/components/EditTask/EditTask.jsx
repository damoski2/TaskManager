import React, { useState, useEffect } from 'react';
import style from './EditTask.module.css';
import { fetchSingleTask, isAuthenticated, editTask, signOut } from '../API_endpoints';
import { Redirect } from 'react-router-dom'

const EditTask = ({ match, history }) => {

    const [task, setTask] = useState({})
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [newTask, setNewTask] = useState("");

    const { user: { id, fullname, age, email } } = isAuthenticated()

    const init = (taskID)=>{
        fetchSingleTask(taskID)
          .then(data=>{
              if(error){
                setError(data.error);
              }else{
                  setTask(data);
              }
          })
    }


    //Fetch Curent task on component mount
    useEffect(()=>{
        init(match.params.taskID);
    },[])

    const handleChange = (e)=>{
        setTask({ ...task, todo:e.target.value })
    }

    const submit = (e)=>{
        e.preventDefault();
        editTask({ task: task.todo, taskID: match.params.taskID })
          .then(data=>{
              if(data.error){
                  setError(data.error);
              }else{
                  init(match.params.taskID)
                  setSuccess(true)
              }
          })
    }

    const navBar = ()=>(
        <nav className={style.nav} >
            <h1>Todo</h1>
            <div>
                <span>
                    Hello, {fullname}
                </span>
                <button onClick={()=>{
                    signOut(()=>{
                        history.push('/login')
                    })
                }} >
                    SignOut
                </button>
            </div>
        </nav>
       )


    const RedirectToDashBoard = ()=>{
        if(success){
            return <Redirect to="/task/dashboard" />
        }
    }

    const form = ()=>{
        return (
            <form className={style.form} onSubmit={submit} >
                <h3>Edit Task</h3>
                <p>Title*</p>
                <textarea onChange={handleChange} value={task.todo} />
                <input type="submit" value="Save" />
            </form>
        )
    }

    return (
        <div className={style.container} >
            {RedirectToDashBoard()}
            {navBar()}
            {form()}
        </div>
    )
}

export default EditTask
