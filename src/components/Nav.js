//navbar component

const Nav = () => {
    return (  
     <div className="nav">
        {/* top logo */}
        <a href="/"><h1>TypeMania</h1></a>
        <ul className="navbar">
        {/* nav items/links */}
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/stats">Statistics</a></li>
            <li><a href="/upload">Upload Song</a></li>
            <li><a href="/register">Register</a></li>

        </ul>
     </div>   
    );
}
 
export default Nav;