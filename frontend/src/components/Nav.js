import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { useEffect } from 'react'

//navbar component
const Nav = () => {

    const navigate = useNavigate()

    const [sendLogout, {
        isSuccess
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])




    return (  
     <div className="nav">
        {/* top logo */}
        <a href="/"><h1>TypeMania</h1></a>
        <ul className="navbar">
        {/* nav items/links */}
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/stats">Statistics</Link></li>
            {/*<li><Link to="/upload">Upload Music</Link></li>*/}
            <li><Link to="/" onClick={sendLogout}>Logout</Link></li>


        </ul>
     </div>   
    );
}
 
export default Nav;