import react, { useState } from "react";
import "./App.css";
import axios from "axios";
import { LandingPage, Login, SignUp, TaskDasboard, EditTask } from './components/imports';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter, Route} from 'react-router-dom'

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    axios
      .post(`http://localhost:8080/create`, {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      })
      .then((res) => setEmployeeList([...employeeList, res.data ]));
  };

  const showEmployees = () => {
    axios.get(`http://localhost:8080/employees`)
      .then((res)=> {
        console.log(res);
        setEmployeeList(res.data);
      })
  };

  return (
    <BrowserRouter>
      <Route path="/signUp" exact component={SignUp} />
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/task/dashboard" exact component={TaskDasboard} />
      <PrivateRoute path="/editTask/:taskID" exact component={EditTask} />
      <Route path="/" exact component={LandingPage} />
     {/*  <div className="information">
        <label>Name: </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <label>Age: </label>
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
        />
        <label>Country: </label>
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          type="text"
        />
        <label>Position: </label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          type="text"
        />
        <label>Wage(year): </label>
        <input
          value={wage}
          onChange={(e) => setWage(e.target.value)}
          type="number"
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>

      <br></br>
      <div className="employees">
        <button onClick={showEmployees}>Show Employees</button>
        {employeeList.map(list=>(
          <div className="employee" >
            <p>Name: {list.name}</p>
            <p>Age: {list.age}</p>
            <p>Country: {list.country}</p>
            <p>Wage: {list.wage}</p>
            <p>Position: {list.position}</p>
          </div>
        ))}
      </div> */}
    </BrowserRouter>
  );
}

export default App;
