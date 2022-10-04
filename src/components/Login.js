//file imports
import React, { useState } from 'react' 
import LoginForm from './LoginForm'

//login page component
const Login = () => {
    //temporary data for testing purposes, will be stores in db
    const adminUser = {
        email: 'admin@mail.com',
        password: 'password'
    }

    //set initial states of user form data
    const [user, setUser] = useState({name: "", email: ""});
    const [error, setError] = useState("");

    //function verify login (mock)
    const Login = details => {
        //details pulled from login form submition
        console.log(details);
        //used for temporary data, will be changed when linked to db
        if (details.email === adminUser.email && details.password === adminUser.password) {
            console.log("logged in")
            setUser({
                name: details.name,
                email: details.email
            })
        } else
            console.log("Email and password do not match")
            setError("Email and password do not exist or do not match")
    }

    //reset details data, will reset cookies when login cookies added to code
    const Logout = () => {
        console.log("Logout");setUser({
            name: "",
            email: ""
        })
    }
    

    return (  
    <div className="login"> 
            {(user.email !== "") ? (
                <div className="space">
                    <div className="welcome">
                        {/* will change logout option to nav bar */}
                        <h1>Welcome, <span>{user.name}</span></h1>
                        <p>This will be changed once the login cookies are implemented. The user will be redirected ot the personalized home page. Click logout to logout of current user. </p>
                        <button onClick={Logout}>Logout</button>
                    </div>
                </div>
            ) : (
                //login form component
                <LoginForm Login={Login} error={error}/>
            )}
    </div>   
    );
}
 
export default Login;