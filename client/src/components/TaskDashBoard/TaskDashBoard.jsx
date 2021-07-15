import React, { useState, useEffect } from 'react'
import style from './TaskDashBoard.module.css';
import { isAuthenticated, allTasks, addTask, deleteTask, signOut } from '../API_endpoints'
import { Task3, EditIcon, DeleteIcon, AddIcon } from '../Icons/Icons'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';


const TaskDashBoard = ({ history }) => {

    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const [task, setTask] = useState("");
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const { user: { fullname, age, id, email } } = isAuthenticated();


    useEffect(()=>{
        init();
    },[])


    const init =()=>{
        allTasks(id)
          .then(data=>{
              if(data.error){
                setError(data.error);
              }else{
                  setTasks(data)
              }
          })
    }

    console.log(tasks)

    const submitTask = (e)=>{
        console.log(id,task)
        addTask({userID:id,task})
          .then(data=>{
              if(data.error){
                  setError(data.error);
              }else{
                  init()
              }
          })
    }

    const DeleteTask = (taskID)=>{
        deleteTask(taskID)
          .then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                init();
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

    const taskList = (tasks)=>{
       return(
        <>
        {tasks.map((t,i)=>(
            <div className={style.list} >
                <p>{t.todo}</p>
                <div className={style.crud} >
                    <Link to={`/editTask/${t.id}`} >
                        <EditIcon />
                    </Link>
                    <span onClick={()=>DeleteTask(t.id)} >
                        <DeleteIcon />
                    </span>
                </div>
            </div>
        ))}
    </>
       )
    }

    const emptyList = ()=>(
        <>
            No Task Added 
        </>
    )


    const body = ()=>{
        return(
            <div className={style.body} >
                <h2><Task3 /> <span> Tasks</span></h2>
                <div>
                    <h5>Add task</h5>
                    <hr className={style.hr} />
                    {tasks.length > 0?(
                        taskList(tasks)
                    ):(
                        emptyList()
                    )}
                <button onClick={()=> setModal(!modal)} className={style.addbtn} data-toggle="modal" data-target="#exampleModal" >
                    <AddIcon /> <span>Add new task</span>
                </button>
                </div>

                <Form style={{ display: "flex", flexDirection: 'column' }}>
                    <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add Task</ModalHeader>
                    <ModalBody>
                       <input className={style.input} type="text" value={task} onChange={(e)=> setTask(e.target.value)} />
                    </ModalBody>
                    <button onClick={submitTask} className={style.btn} type="submit" >
                        Submit
                    </button>
                    </Modal>
                </Form>
            </div>
        )
    }

    return (
        <div className={style.container} >
            {navBar()}
            {body()}
        </div>
    )
}

export default TaskDashBoard