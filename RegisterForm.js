//import files
import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "../features/users/userApiSlice.js"
import { useNavigate } from "react-router-dom"
import PubNav from './public/PubNav'
import Footer from "./Footer.js"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSave } from "@fortawesome/free-solid-svg-icons"


//set for input verification
const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

//register form component
const RegisterForm = () => {

    //gives addNEwUSer function
    const [addNewUser, {
        //objects
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    //navigate function
    const navigate = useNavigate()

    //states
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validConfirmPassword, setValidConfirmPassword] = useState(false)


    // validate email with defined email_regex
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])
    
    // validate username with defined user_regex
    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    // validate password with defined pwd_regex
    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    //validaet confirm password
    useEffect(() => {
        setValidConfirmPassword(password === confirmPassword)
    }, [password, confirmPassword])

    //reset states
    useEffect(() => {
        if (isSuccess) {
            setEmail('')
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            navigate('/login')
        }
    }, [isSuccess, navigate])

    //handlers
    const onEmailChanged = e => setEmail(e.target.value)
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onConfirmPasswordChanged = e => setConfirmPassword(e.target.value)

    //submit button enabler
    const canSave = [validEmail, validUsername, validPassword, validConfirmPassword].every(Boolean) && !isLoading

    const submitHandler = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ email, username, password })
        }
    }


    const errClass = isError ? "errmsg" : "offscreen"


    return ( 
        <div className='formtainer'>
            <PubNav />
            <div className="loginForm">
                
                <form onSubmit={submitHandler}>
                    <div className="form-inner">
                        <h2>Register New User</h2>
                        <h3 className={errClass}>{error?.data?.message}</h3>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                // className={`${validEmailClass}`}
                                type="text" 
                                name="email" 
                                id="email" 
                                autoComplete="off"
                                onChange={onEmailChanged}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Username<span className='nowrap'>[3-20 letters]</span></label>
                            <input 
                                //className={`${validUserClass}`}
                                type="text" 
                                name="username" 
                                id="username" 
                                autoComplete="off"
                                onChange={onUsernameChanged}
                                value={username}
                            />
                        </div> 
                        <div className="form-group">
                            <label htmlFor="password">Password<span className='nowrap'>[4-12 chars incl !@#$%]</span></label>
                            <input 
                                //className={`${validPwdClass}`}
                                type="password" 
                                name="password" 
                                id="password" 
                                autoComplete="off"
                                onChange={onPasswordChanged}
                                value={password}
                            />
                        </div> 
                        <div className="form-group">
                            <label htmlFor="name">Confirm Password</label>
                            <input 
                                //className={`${validConfPwdClass}`}
                                type="password" 
                                name="confirmPassword" 
                                id="confirmPassword" 
                                autoComplete="off"
                                onChange={onConfirmPasswordChanged}
                                value={confirmPassword}
                            />
                        </div> 
                        

                        <button
                         className='button'
                         title='Submit'
                         disabled={!canSave}
                         >
                         Submit
                         </button>

                        <p>Already registered? <a href="./login">Login</a></p>

                    </div>
                </form>
            </div>   
            <Footer/>
        </div>
    );
}
 
export default RegisterForm;