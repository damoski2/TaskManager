
/** APPLICATION API ENDPOINTS REQUESTS */


export const signUp = (user)=>{
    return fetch(`http://localhost:8080/user/signUp`,{
        method: 'POST',
        headers:{
            "Accept":"application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=> console.log(err))
}



export const signIn = (user)=>{
    return fetch('http://localhost:8080/user/signIn',{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}


export const authenticate = (data, next)=>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwtSQL", JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = ()=>{
    if(typeof window == "undefined"){
        return false;
    }

    if(localStorage.getItem("jwtSQL")){
        return JSON.parse(localStorage.getItem("jwtSQL"))
    }else{
        return false;
    }
}


export const signOut = (next)=>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwtSQL");
        next();
        return fetch(`http://localhost:8080/signOut`,{
            method: "GET"
        })
        .then(res=>{
            console.log('signout',res)
        })
        .catch(err=> console.log(err))
    }
    next();
}

export const allTasks = (userID)=>{
    return fetch(`http://localhost:8080/fetchTasks/${userID}`,{
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        console.log(err);
    })
}


export const fetchSingleTask = (taskID)=>{
    return fetch(`http://localhost:8080/fetchTask/${taskID}`,{
        method: "GET",
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err));
}

export const addTask = (post)=>{
    return fetch(`http://localhost:8080/createTask`,{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        console.log(err);
    })
}

export const deleteTask = (taskID)=>{
    return fetch(`http://localhost:8080/deleteTask/${taskID}`,{
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}

export const editTask = (post)=>{
    return fetch(`http://localhost:8080/updateTask`,{
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err));
}

export const searchCountry = ()=>{
    return fetch(`https://restcountries.eu/rest/v2/all`,{
        method: "GET"
    })
    .then(res=>{
       return res.json()
    })
    .then(data=>{
        var countriesName = data.map(c=> [c.name, c.capital])
        console.log(countriesName)
    })
    .catch(err=> console.log(err))
}




