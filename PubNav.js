import { Link } from 'react-router-dom'

//navbar component
const Nav = () => {
    return (  
     <div className="nav">
        {/* top logo */}
        <a href="/"><h1>TypeMania</h1></a>
        <ul className="navbar">
        {/* nav items/links */}
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>

        </ul>
     </div>   
    );
}
 
export default Nav;