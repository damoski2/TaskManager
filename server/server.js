const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { signUp, signIn } = require('./controller/auth');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

/**
 * SQL connection
*/
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'employeesystem'
})

exports.db = db;

const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Backend working and running')
})



                                    /*API ENDPOINTS(ROUTES)*/

//SignUp logic

app.post('/user/signUp', (req,res)=>{
    const { fullname, email, password, age } = req.body;

    if(!fullname || !email || !password || !age){
        return res.status(404).json({
            error: 'Please enter all fields'
        })
    }

    db.query(`SELECT * FROM user WHERE email=${email}`, (err,data)=>{
        if(data){
            return res.status(404).json({
                error: 'User Already exists please signUp'
            })
        }else{
            db.query(`INSERT INTO user(fullname, password, age, email) VALUES(?,?,?,?)`,
            [fullname,password, age, email],
            (err,data)=>{
                if(err){
                    return res.status(404).json({
                        error: err.sqlMessage
                    })
                }

                res.json(data);
            })
        }
    })

})

app.post('/user/signin', (req,res)=>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(404).json({
            error: 'Enter all fields'
        })
    }

    db.query(`SELECT * FROM user WHERE email= '${email}' LIMIT 1`,(err,user)=>{
        if(err || !user){
            return res.status(404).json({
                error: err.sqlMessage
            });
        }

        if(user[0].password !== password){
            console.log(user.password, password)
            return res.status(404).json({
                error: 'Incorrect Password'
            })
        }

        const token = jwt.sign({id: user[0].id},  process.env.JWT_SECRET)
        res.cookie('t',token, {expire: new Date()+9999})
        const { id, fullname, email, age } = user[0];
        return res.json({token, user:{ id, fullname, email, age }});
    })
})


app.get('/signOut',(req,res)=>{
    res.clearCookie('t')
    res.json({ msg: "SignOut success" });
})


//Tasks endpoint
//Create
app.post('/createTask', (req,res)=>{
    const { userID, task } = req.body;
    console.log(userID, task);
    db.query(`INSERT INTO task(userID, todo) VALUES (?,?)`,
    [userID,task],
    (err, task)=>{
        if(err){
            return res.status(404).json({
                error: err.sqlMessage
            })
        }
        res.json(task)
    }
    )
})


//Edit/update
app.put('/updateTask',(req,res)=>{
    const { task, taskID } = req.body;
    db.query(`UPDATE task SET todo='${task}' WHERE id=${taskID}`,
    (err,task)=>{
        if(err){
            return res.status(404).json({
                error: err.sqlMessage
            })
        }
        res.json(task)
    }
    )
})

app.delete('/deleteTask/:taskID', (req,res)=>{
    db.query(`DELETE FROM task WHERE id=${req.params.taskID}`,
    (err,data)=>{
        if(err){
            return res.status(404).json({
                error: err.sqlMessage
            })
        }
        res.json({
            msg: "Task deleted."
        })
    })
})


//Fetch
app.get('/fetchTasks/:userID', (req,res)=>{
    db.query(`SELECT * FROM  task WHERE userID=${req.params.userID}`,
    (err, tasks)=>{
        if(err){
            return res.status(404).json({
                error: err.sqlMessage
            })
        }
        res.json(tasks);
    }
    )
})

//Fetch Single
app.get('/fetchTask/:taskID', (req,res)=>{
    db.query(`SELECT * FROM task WHERE id=${req.params.taskID} LIMIT 1`,
    (err,task)=>{
        if(err){
            return res.status(404).json({
                error: err.sqlMessage
            })
        }
        res.json(task[0]);
    }
    )
})

app.post('/create',(req,res)=>{
    const { name, age, country, position, wage } = req.body;

    //Insert into MySQL database
    db.query('INSERT INTO employees(name, age, country, position, wage) VALUES( ?,?,?,?,?)',
    [name,age,country,position,wage],
    (err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.send('Values Inserted')
        }
    }
    )
})

app.get('/employees',(req,res)=>{
    db.query('SELECT * FROM employees',(err,data)=>{
        if(err){
            return res.status(404).json({
                error: err.sqlMessage
            })
        }else{
            res.json(data)
        }
    })
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
});