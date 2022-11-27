import useAuth from "../hooks/useAuth"

const WelcomeBack = () => {
    //username state
    const { username } = useAuth()
    return(
        <h3 className="welcome">Welcome back, {username}!</h3>
    )
}

export default WelcomeBack;