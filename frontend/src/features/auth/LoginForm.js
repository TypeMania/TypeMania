//file imports
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import PubNav from '../../components/public/PubNav'
import Footer from '../../components/Footer'


//login page component
const LoginForm = () => {
    //hooks
    const userRef = useRef()
    const errRef = useRef()
    //states
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    //hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //returns isloading
    const [login, { isLoading }] = useLoginMutation()

    //focuses user input
    useEffect(() => {
        userRef.current.focus()
    }, [])

    //dsiplay error
    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken, username }))
            setUsername('')
            setPassword('')
            navigate('/home')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            //focus set on error message
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)


    //create error class
    const errClass = errMsg ? "errmsg" : "offscreen"
    //checking when mutation is called
    if (isLoading) return <p>Loading...</p>
    return ( 
        <div className='formtainer'>
            <PubNav />
            <div className="loginForm">
                {/* //error display */}
                
                <form onSubmit={submitHandler}>
                    <div className="form-inner">
                        <h2>Login</h2>
                        <h3 ref={errRef} className={errClass} aria-live="assertive">{errMsg}</h3>
                       
                        <div className="form-group">
                             
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text"
                                id="username"
                                ref={userRef}
                                value={username}
                                onChange={handleUserInput}
                                autoComplete="off"
                                required
                            />
                        </div> 
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                id="password"
                                onChange={handlePwdInput}
                                value={password}
                                required
                            />
                        </div>
                        <button className="button" title='Submit'>Submit</button>
           
                        <p className="link">Not registered? <a href="./register">Register</a></p>
                        
                    </div>
                </form>   
            </div>  
            <Footer/>
        </div>
    );
}
 
export default LoginForm;